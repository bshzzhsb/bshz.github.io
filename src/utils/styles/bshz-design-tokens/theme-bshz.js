// import hex2rgba from "hex2rgba"

import {
  theme as defaultTheme,
  colors as colorsTokens,
  space as spaceTokens,
} from "./theme"

const c = {
  ...colorsTokens,
}

// sizes
const s = {
  headerHeight: spaceTokens[11],
  bannerHeight: spaceTokens[8],
  logo: spaceTokens[6],
  pluginsSidebarWidthDefault: `21rem`,
  pluginsSidebarWidthLarge: `24rem`,
  showcaseSidebarMaxWidth: `15rem`,
  sidebarItemMinHeight: spaceTokens[8],
  sidebarUtilityHeight: spaceTokens[10],
  pageHeadingDesktopWidth: spaceTokens[10],
  mainContentWidth: {
    default: `54rem`,
    withSidebar: `42rem`,
  },
  sidebarWidth: {
    default: `16.5rem`,
    large: `18rem`,
    mobile: `320px`,
  },
  tocWidth: `18rem`,
  avatar: spaceTokens[7],
}

const zIndices = {
  widget: 2,
  navigation: 5,
  banner: 10,
  modal: 10,
  sidebar: 10,
  floatingActionButton: 20,
  skipLink: 100,
}

const newTheme = {
  ...defaultTheme,
  initialColorMode: `light`,
  useColorSchemeMediaQuery: true,
  colors: c,
  sizes: s,
  zIndices: zIndices,
  buttons: {
    large: {
      fontSize: 4,
      px: 4,
      height: `52px`,
    },
    small: {
      fontSize: 2,
      py: 2,
      px: 3,
    },
  },
  links: {
    muted: {
      fontSize: 1,
      lineHeight: `solid`,
      py: 3,
      "&&": {
        border: 0,
        color: `textMuted`,
        display: `flex`,
        fontWeight: `body`,
      },
      "&&:hover": {
        color: `link.hoverColor`,
      },
    },
  },
}

export {
  borders,
  breakpoints,
  fonts,
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights,
  mediaQueries,
  radii,
  shadows,
  space,
  transition,
} from "./theme"

// individual exports
// colors extended with theme-ui required values
export { c as colors, s as sizes, zIndices }

export const theme = newTheme