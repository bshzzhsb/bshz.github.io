/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"

import { mediaQueries } from "../../utils/styles/bshz-design-tokens"

const HomeItem = ({ item }) => (
  <li
    sx={{
      borderRadius: t => t.radii[2],
      width: `60vw`,
      mr: t => t.space[6],
      "&:last-child": {
        mr: 0,
      },
      [mediaQueries.md]: {
        m: t => `0 ${t.space[6]} ${t.space[6]} 0`,
        width: `20rem`,
      },
      [mediaQueries.lg]: {
        flexBasis: `45%`,
        "&:nth-of-type(3n)": {
          ml: t => t.space[6],
        },
        "&:nth-of-type(4n)": {
          mr: 0,
        },
      },
    }}
  >
    <div
      sx={{
        display: `flex`,
        flexDirection: `column`,
        height: `100%`,
        position: `relative`,
        p: t => `${t.space[6]} ${t.space[6]} ${t.space[6]} ${t.space[8]}`,
        boxShadow: t => t.shadows.raised,
        borderRadius: t => t.radii[2],
        cursor: `pointer`,
        "&:hover": {
          bg: t => t.colors.ui.hover,
        },
        "&:before": {
          bg: item.type === `Explore` ? `#eeebff` : `#e6f5f5`,
          position: `absolute`,
          top: 0,
          left: 0,
          bottom: 0,
          content: `''`,
          width: t => t.space[5],
          borderRadius: t => `${t.radii[2]} 0 0${t.radii[2]}`
        },
        "&:after": {
          position: `absolute`,
          content: `'${item.type}'`,
          color: item.type === `Explore` ? `#4764ff` : `#00bdb6`,
          fontFamily: t => t.fonts.monospace,
          fontSize: t => t.fontSizes[0],
          left: 0,
          bottom: 0,
          letterSpacing: t => t.letterSpacings.tracked,
          textTransform: `uppercase`,
          transform: `rotate(-90deg) translateX(-0.5rem)`,
          transformOrigin: `top left`,
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
        <h3
          sx={{
            margin: 0,
            fontSize: t => t.fontSizes[2],
          }}
        >
          { item.name }
        </h3>
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
  </li>
)

export default HomeItem