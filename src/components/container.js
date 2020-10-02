/** @jsx jsx */
import { jsx } from "theme-ui"

function Container({ children, withSidebar=true, overrideCSS }) {
  return (
    <div sx={{
      maxWidth: `1600px`,
      mx: `auto`,
      px: [`1rem`, `1.5rem`, `2rem`, `2.5rem`, `4rem`],
      py: `1em`,
      position: `relative`,
      ...overrideCSS,
    }}>
      {children}
    </div>
  )
}

export default Container