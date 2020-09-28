/** @jsx jsx */
import { jsx } from "theme-ui"

function Container({ children, withSidebar=true, overrideCSS }) {
  return (
    <div sx={{
      maxWidth: `1600px`,
      mx: `auto`,
      px: 4,
      py: 8,
      position: `relative`,
      ...overrideCSS,
    }}>
      {children}
    </div>
  )
}

export default Container