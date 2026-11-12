# pinball-machine

Scaled (82%) pinball machine. A portable hybrid machine: a static playing field with a monitor that shows real-time graphics, video and audio for the selected game scenario, and modern electronics in place of electro-mechanical devices.

**Dashboard:** https://scbeme.github.io/pinball-machine/ (status and links are derived from this repository on every deploy)

| Folder | Holds |
|---|---|
| `system/` | System documents (`machine_master.md`, `electrical_master.md`), `drawings/`, `system_common_components/` |
| `devices/<group>/<id>_<name>/` | One folder per device: `README.md` (functions, constraints, parameters), `schematic.svg`, `control_logic.md`, `tests/`, and `cad/` and `print/` at design freeze |
| `devices/<group>/common_components/` | Design shared by every device in a group |
| `dashboard/` | The dashboard app and `scan.py`, which checks names and links and derives status |

Names are lowercase with no spaces (only `README.md` keeps capitals). A `draft_` prefix on a file or folder means In Progress; an `interim_` prefix marks a drawing that is not a deliverable.
