/** @jsx jsx */
import { jsx } from "theme-ui"

function Container({ children, withSidebar=true, overrideCSS }) {
  return (
    <div sx={{
      maxWidth: `42rem`,
      width: `100%`,
      mx: `auto`,
      px: t => t.space[8],
      py: t => t.space[8],
      position: `relative`,
      ...overrideCSS,
    }}>
      {children}
    </div>
  )
}

export default Container