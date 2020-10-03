/** @jsx jsx */
import { jsx } from "theme-ui"

function Container({ children, withSidebar=true, overrideCSS }) {
  return (
    <div sx={{
      maxWidth: `42rem`,
      mx: `auto`,
      px: `2rem`,
      py: `1rem`,
      position: `relative`,
      ...overrideCSS,
    }}>
      {children}
    </div>
  )
}

export default Container