/*
 * WS2812B dome baseline test, test 20261118-01
 * File: test_ws2812b_dome_baseline_main.c (copy to src/main.c of the Blue Pill PlatformIO project)
 * Build: env bluepill_usb. Upload this file before every test run (test card, Step 0); the chip
 * has no version string and its flash cannot be read back, so never assume it is already loaded.
 * STM32F103C8T6 Blue Pill, STM32Cube HAL, PlatformIO.
 *
 * Pins (Topedal Rev 1.1 assignments, PMDD Table 5.3-5):
 *   PB15  Neo3, SPI2_MOSI -> LED1 DIN direct, 3.3 V (LED1 DOUT -> LED2 DIN)
 *   PB12  Sw1, tactile switch to GND, internal pull-up
 *   PC13  onboard LED, active low, readout (blink count)
 *
 * Controls (one switch):
 *   Short press (<1 s): next brightness level (wraps)
 *   Long press (>=1 s): next color preset (wraps; brightness kept)
 * After each change PC13 blinks the state number: first the color number,
 * a pause, then the brightness number (both 1-based).
 * LED1 and LED2 always show the same value. LED1 is under the dome,
 * LED2 is bare (reference).
 *
 * WS2812B data via SPI2: 4.5 MHz, 5 SPI bits per WS bit
 * (1 = 11100 -> 0.67 us high, 0 = 10000 -> 0.22 us high, bit period 1.11 us).
 * The earlier 2.25 MHz, 3-bit timing gave a color error on the first LED in this rig.
 * APP_VTOR_OFFSET (set by env bluepill_usb) relocates the vector table for the USB bootloader.
 */
#include "stm32f1xx_hal.h"
#include <stdint.h>
#include <string.h>

#define NUM_LEDS 2

typedef struct { uint8_t r, g, b; } rgb_t;

/* Color presets (full-scale RGB, scaled by brightness). Edit freely. */
static const rgb_t colors[] = {
  {255, 255, 255},  /* 1 white (R+G+B)      */
  {255, 147,  41},  /* 2 warm white approx. */
  {255,   0,   0},  /* 3 red                */
  {  0, 255,   0},  /* 4 green              */
  {  0,   0, 255},  /* 5 blue               */
  {255, 191,   0},  /* 6 amber              */
  {  0, 255, 255},  /* 7 cyan               */
  {255,   0, 255},  /* 8 magenta            */
};
#define NUM_COLORS (sizeof(colors) / sizeof(colors[0]))

/* Brightness scale factor, 8-bit (doubling steps, roughly even perceived steps). */
static const uint8_t levels[] = { 4, 8, 16, 32, 64, 128, 255 };
#define NUM_LEVELS (sizeof(levels) / sizeof(levels[0]))

static SPI_HandleTypeDef hspi2;
static uint8_t txbuf[NUM_LEDS * 24 * 5 / 8 + 64]; /* data + >50 us low tail (~114 us at 4.5 MHz) */

static void SystemClock_Config(void) {
  RCC_OscInitTypeDef o = {0};
  RCC_ClkInitTypeDef c = {0};
  o.OscillatorType = RCC_OSCILLATORTYPE_HSE;
  o.HSEState = RCC_HSE_ON;
  o.HSEPredivValue = RCC_HSE_PREDIV_DIV1;
  o.PLL.PLLState = RCC_PLL_ON;
  o.PLL.PLLSource = RCC_PLLSOURCE_HSE;
  o.PLL.PLLMUL = RCC_PLL_MUL9;           /* 8 MHz x 9 = 72 MHz */
  HAL_RCC_OscConfig(&o);
  c.ClockType = RCC_CLOCKTYPE_HCLK | RCC_CLOCKTYPE_SYSCLK |
                RCC_CLOCKTYPE_PCLK1 | RCC_CLOCKTYPE_PCLK2;
  c.SYSCLKSource = RCC_SYSCLKSOURCE_PLLCLK;
  c.AHBCLKDivider = RCC_SYSCLK_DIV1;
  c.APB1CLKDivider = RCC_HCLK_DIV2;      /* APB1 36 MHz -> SPI2 */
  c.APB2CLKDivider = RCC_HCLK_DIV1;
  HAL_RCC_ClockConfig(&c, FLASH_LATENCY_2);
}

static void gpio_init(void) {
  GPIO_InitTypeDef g = {0};
  __HAL_RCC_GPIOB_CLK_ENABLE();
  __HAL_RCC_GPIOC_CLK_ENABLE();
  g.Pin = GPIO_PIN_13; g.Mode = GPIO_MODE_OUTPUT_PP; g.Speed = GPIO_SPEED_FREQ_LOW;
  HAL_GPIO_Init(GPIOC, &g);
  HAL_GPIO_WritePin(GPIOC, GPIO_PIN_13, GPIO_PIN_SET);   /* LED off */
  g.Pin = GPIO_PIN_12; g.Mode = GPIO_MODE_INPUT; g.Pull = GPIO_PULLUP;
  HAL_GPIO_Init(GPIOB, &g);
}

static void spi_init(void) {
  GPIO_InitTypeDef g = {0};
  __HAL_RCC_SPI2_CLK_ENABLE();
  g.Pin = GPIO_PIN_15; g.Mode = GPIO_MODE_AF_PP; g.Speed = GPIO_SPEED_FREQ_HIGH;
  HAL_GPIO_Init(GPIOB, &g);                               /* PB15 = SPI2_MOSI */
  hspi2.Instance = SPI2;
  hspi2.Init.Mode = SPI_MODE_MASTER;
  hspi2.Init.Direction = SPI_DIRECTION_1LINE;             /* TX only */
  hspi2.Init.DataSize = SPI_DATASIZE_8BIT;
  hspi2.Init.CLKPolarity = SPI_POLARITY_LOW;
  hspi2.Init.CLKPhase = SPI_PHASE_1EDGE;
  hspi2.Init.NSS = SPI_NSS_SOFT;
  hspi2.Init.BaudRatePrescaler = SPI_BAUDRATEPRESCALER_8; /* 36 MHz / 8 = 4.5 MHz, 222 ns per SPI bit */
  hspi2.Init.FirstBit = SPI_FIRSTBIT_MSB;
  hspi2.Init.TIMode = SPI_TIMODE_DISABLE;
  hspi2.Init.CRCCalculation = SPI_CRCCALCULATION_DISABLE;
  HAL_SPI_Init(&hspi2);
}

/* Encode one byte (MSB first) into 5 SPI bytes: 5 SPI bits per WS bit at 4.5 MHz.
   0 = 10000 (T0H 0.22 us, T0L 0.89 us), 1 = 11100 (T1H 0.67 us, T1L 0.56 us). */
static uint8_t *enc_byte(uint8_t *p, uint8_t v) {
  uint64_t bits = 0;
  for (int i = 7; i >= 0; i--)
    bits = (bits << 5) | (((v >> i) & 1) ? 0x1C : 0x10);
  for (int k = 4; k >= 0; k--)
    *p++ = (uint8_t)((bits >> (8 * k)) & 0xFF);
  return p;
}

static void leds_show(rgb_t c, uint8_t scale) {
  uint8_t *p = txbuf;
  memset(txbuf, 0, sizeof(txbuf));
  for (int i = 0; i < NUM_LEDS; i++) {
    p = enc_byte(p, (uint8_t)((c.g * scale) / 255));      /* GRB order */
    p = enc_byte(p, (uint8_t)((c.r * scale) / 255));
    p = enc_byte(p, (uint8_t)((c.b * scale) / 255));
  }
  HAL_SPI_Transmit(&hspi2, txbuf, sizeof(txbuf), 100);    /* tail = reset (>50 us) */
}

static void blink_n(unsigned n) {
  for (unsigned i = 0; i < n; i++) {
    HAL_GPIO_WritePin(GPIOC, GPIO_PIN_13, GPIO_PIN_RESET); HAL_Delay(150);
    HAL_GPIO_WritePin(GPIOC, GPIO_PIN_13, GPIO_PIN_SET);   HAL_Delay(250);
  }
}

static void report(unsigned ci, unsigned li) {
  blink_n(ci + 1);
  HAL_Delay(700);
  blink_n(li + 1);
}

int main(void) {
#ifdef APP_VTOR_OFFSET
  SCB->VTOR = FLASH_BASE | APP_VTOR_OFFSET; /* app lives behind USB bootloader */
#endif
  HAL_Init();
  SystemClock_Config();
  gpio_init();
  spi_init();

  unsigned ci = 0, li = 3;   /* start: white, level 4 (scale 32) */
  leds_show(colors[ci], levels[li]);

  for (;;) {
    if (HAL_GPIO_ReadPin(GPIOB, GPIO_PIN_12) == GPIO_PIN_RESET) {
      HAL_Delay(30);                                      /* debounce */
      if (HAL_GPIO_ReadPin(GPIOB, GPIO_PIN_12) != GPIO_PIN_RESET) continue;
      uint32_t t0 = HAL_GetTick();
      while (HAL_GPIO_ReadPin(GPIOB, GPIO_PIN_12) == GPIO_PIN_RESET &&
             HAL_GetTick() - t0 < 1000) { }
      if (HAL_GPIO_ReadPin(GPIOB, GPIO_PIN_12) == GPIO_PIN_RESET) {
        ci = (ci + 1) % NUM_COLORS;                       /* long press */
        while (HAL_GPIO_ReadPin(GPIOB, GPIO_PIN_12) == GPIO_PIN_RESET) { }
      } else {
        li = (li + 1) % NUM_LEVELS;                       /* short press */
      }
      HAL_Delay(30);
      leds_show(colors[ci], levels[li]);
      report(ci, li);
    }
  }
}

void SysTick_Handler(void) { HAL_IncTick(); }
