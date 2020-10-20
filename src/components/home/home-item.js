/** @jsx jsx */
import { jsx } from "theme-ui"

const HomeItem = ({ item }) => (
  <li
    sx={{
      borderRadius: t => t.radii[2],
      listStyle: `none`,
      mb: t => t.space[4],
    }}
  >
    <div
      sx={{
        display: `flex`,
        flexDirection: `column`,
        height: `100%`,
        position: `relative`,
        p: t => t.space[2],
        pl: t => t.space[7],
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
          p: t => `${t.space[2]} 0 0`,
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