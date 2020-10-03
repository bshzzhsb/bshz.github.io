/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"

import { mediaQueries } from "../../utils/styles/bshz-design-tokens"

const HomeItem = ({ item, className }) => (
  <div
    sx={{
      mr: t => t.space[6],
      overflowX: `scroll`,
      WebkitOverflowScrolling: `touch`,
      scrollbarWidth: `none`,
      WebkitScrollbar: {
        display: `none`,
      },
      [mediaQueries.md]: {
        borderBottom: t => `${t.borders[1]} ${t.colors.ui.border}`,
        m: 0,
        width: `auto`,
      },
    }}
  >
    <div
      sx={{
        display: `flex`,
        flexDirection: `column`,
        height: `100%`,
        p: t => t.space[6],
        boxShadow: t => t.shadows.raised,
        borderRadius: t => t.radii[2],
        cursor: `pointer`,
        "&:hover": {
          bg: t => t.colors.ui.hover,
        },
      }}
    >
      <header
        sx={{
          display: `flex`,
          alignItems: `flex-start`,
          justifyContent: `space-between`,
        }}
      >
        <h3>{ item.name }</h3>
      </header>
      <div
        sx={{
          display: `flex`,
          flex: 1,
          justifyContent: `space-between`,
          fontFamily: t => t.fonts.system,
          p: t => `${t.space[3]} 0 0`,
        }}
      >
        <div
          sx={{
            color: t => t.colors.textMuted,
            flex: 1,
            fontSize: t => t.fontSizes[1],
          }}
          dangerouslySetInnerHTML={{__html: item.description}}
        />
      </div>
    </div>
  </div>
)

export default HomeItem