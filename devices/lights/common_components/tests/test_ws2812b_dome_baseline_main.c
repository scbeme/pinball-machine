/*
 * ============================================================================
 * File:       test_ws2812b_dome_baseline_main.c
 *             (copy to src/main.c of the Blue Pill PlatformIO project)
 * Revision:   20261120-01        Date: 2026-11-20
 * Supersedes: version on main at 0e6fbc4 (no revision ID in its header)
 * Test:       test 20261118-01, WS2812B dome baseline
 *             (card: test_ws2812b_dome_baseline.md)
 * Target:     STM32F103C8T6 Blue Pill, STM32Cube HAL, PlatformIO env
 *             bluepill_usb (USB DFU bootloader; APP_VTOR_OFFSET relocates
 *             the vector table)
 *
 * PURPOSE
 *   Drive two daisy-chained WS2812B LEDs (LED1 under the dome, LED2 bare
 *   reference) with identical color and brightness. SW1 selects color and
 *   brightness; PC13 reports the selection.
 *
 * HARDWARE
 *   Defined by test_ws2812b_dome_baseline_circuit.svg (74AHCT125N level
 *   shifter, 5 V LED supply). The wiring, parts and net table are in that
 *   drawing and are not repeated here.
 *   Pins used by this code:
 *     PB15  SPI2_MOSI, LED data out
 *     PB12  SW1 to GND, internal pull-up
 *     PC13  onboard LED, active low
 *
 * CONTROLS (SW1)
 *   Short press (< 1 s)  next brightness level (7 levels, wraps)
 *   Long press (>= 1 s)  next color (8 presets, wraps; brightness kept)
 *
 * PC13 INDICATIONS
 *   After the bootloader's rapid start flashes: 2 short blinks = this
 *   firmware is running.
 *   After each SW1 change: color number (1-8) blinks, 0.7 s pause, level
 *   number (1-7) blinks. Each blink 150 ms on, 250 ms off.
 *   Fast continuous flashing = CPU fault (HardFault).
 *
 * FUNCTIONAL NOTES
 *   1. SW1 is NOT read while the PC13 report is blinking (up to about 6.7 s,
 *      color 8 at level 7). A press during the report is ignored. Wait for
 *      the blinks to finish before the next press.
 *   2. The LED frame is resent every 100 ms, so a corrupted frame is
 *      corrected within 100 ms.
 *   3. Each frame has a low lead-in (48 bytes, about 85 us) and a low tail
 *      (64 bytes, about 114 us); both exceed the 50 us reset time.
 *   4. Data timing: SPI2 at 4.5 MHz, 5 SPI bits per WS bit, GRB order.
 *      0 = 10000 (T0H 0.22 us), 1 = 11100 (T1H 0.67 us). The earlier 3-bit
 *      encoding at 2.25 MHz gave a color error on LED1 in this rig.
 *   5. Levels: 4, 8, 16, 32, 64, 128, 255 of 255 (1.6% to 100%). Start
 *      state: color 1 (white), level 4. Levels 1 and 2 are barely visible.
 *   6. Upload this firmware before every test run (test card Step 0). The
 *      chip has no version string and its flash cannot be read back.
 *
 * KNOWN ISSUES
 *   Intermittent no-start at power-up with the LED chain connected
 *   (observed 2026-11-20, not reproduced, cause not identified). Symptom:
 *   only the bootloader's rapid flashes, no 2-blink start-up banner. A
 *   10 kOhm pull-down on 74AHCT125N pin 2 made no difference.
 *
 * REVISION HISTORY
 *   20261120-01  Added 48-byte lead-in reset, 100 ms frame resend, start-up
 *                banner and HardFault flash; header rewritten.
 *   (earlier)    Single frame at start, no lead-in (main at 0e6fbc4).
 * ============================================================================
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
#define LEAD 48                                   /* >50 us low lead-in (48 bytes = ~85 us at 4.5 MHz) */
static uint8_t txbuf[LEAD + NUM_LEDS * 24 * 5 / 8 + 64]; /* lead-in + data + >50 us low tail (~114 us) */

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
  uint8_t *p = txbuf + LEAD;
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

  /* Start-up banner: 2 short PC13 blinks = app is running */
  for (int i = 0; i < 2; i++) {
    HAL_GPIO_WritePin(GPIOC, GPIO_PIN_13, GPIO_PIN_RESET); HAL_Delay(100);
    HAL_GPIO_WritePin(GPIOC, GPIO_PIN_13, GPIO_PIN_SET);   HAL_Delay(200);
  }
  HAL_Delay(100);            /* Let LEDs and shifter settle after power-up */

  unsigned ci = 0, li = 3;   /* start: white, level 4 (scale 32) */
  leds_show(colors[ci], levels[li]);
  uint32_t last = HAL_GetTick();

  for (;;) {
    if (HAL_GetTick() - last >= 100) {          /* Resend the frame every 100 ms */
      last = HAL_GetTick();
      leds_show(colors[ci], levels[li]);
    }
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

/* A CPU fault flashes PC13 fast and continuously */
void HardFault_Handler(void) {
  for (;;) {
    GPIOC->BSRR = GPIO_BSRR_BR13; for (volatile uint32_t i = 0; i < 1500000; i++) { }
    GPIOC->BSRR = GPIO_BSRR_BS13; for (volatile uint32_t i = 0; i < 1500000; i++) { }
  }
}
