/** @jsx jsx */
import { jsx } from "theme-ui"

import { mediaQueries } from "../utils/styles/bshz-design-tokens"

function Container({ children, withSidebar=true, overrideCSS }) {
  return (
    <div sx={{
      maxWidth: `42rem`,
      width: `100%`,
      mx: `auto`,
      px: t => [t.space[2], null, t.space[4], t.space[8]],
      py: t => [t.space[4], null, null, null, t.space[8],],
      position: `relative`,
      ...overrideCSS,
    }}>
      {children}
    </div>
  )
}

export default Container