import { space } from "../styles/bshz-design-tokens"

const remToPx = rem => parseFloat(rem) * 16
const pxToRem = pixels => `${pixels / 16}rem`

const indention = level => pxToRem(level * remToPx(space[4]))

export default indention