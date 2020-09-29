import { space } from "../styles/bshz-design-tokens"

// const remToPx = rem => `${parseFloat(rem) * 16}px`
const pxToRem = pixels => `${pixels / 16}rem`

const indention = level => pxToRem(level * space[3])

export default indention