import {
  colors,
  space,
  transition,
  radii,
  fonts,
  fontSizes,
  fontWeights,
} from "./bshz-design-tokens/theme-bshz"

export const formInputFocus = {
  borderColor: colors.input.focusBorder,
  boxShadow: `0 0 0 2px ${colors.input.focusBoxShadow}`,
}

export const formInput = {
  backgroundColor: colors.white,
  border: `1px solid ${colors.input.border}`,
  borderRadius: `${radii[2]}`,
  display: `block`,
  fontFamily: fonts.system,
  fontSize: fontSizes[2],
  fontWeight: fontWeights.body,
  lineHeight: `2.25rem`,
  py: 0,
  px: space[2],
  transition: `box-shadow ${transition.speed.default} ${transition.curve.default}`,
  verticalAlign: `middle`,
  "::placeholder": {
    color: colors.input.placeholder,
    opacity: 1,
  },
  "&:focus": {
    ...formInputFocus,
  },
  "&:disabled": {
    cursor: `not-allowed`,
    opacity: `0.5`,
  },
}

export const themedInputFocus = {
  bg: colors.white,
  boxShadow: t => `0 0 0 2px ${t.colors.blue[30]}`,
  outline: 0,
}

export const themedInput = {
  ...formInput,
  appearance: `none`,
  bg: colors.background,
  border: 0,
  color: `text`,
  overflow: `hidden`,
  px: space[4],
  ":focus": {
    ...themedInputFocus,
  },
  "::placeholder": {
    color: colors.input.placeholder,
  },
}