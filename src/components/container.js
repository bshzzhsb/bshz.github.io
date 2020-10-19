/** @jsx jsx */
import { jsx } from "theme-ui"

function Container({ children, className }) {
  return (
    <div
      className={className}
      sx={{
        maxWidth: `42rem`,
        width: `100%`,
        mx: `auto`,
        px: t => [t.space[3], null, t.space[4], t.space[6]],
        py: t => [t.space[6], null, null, null, t.space[8]],
        position: `relative`,
      }}
    >
      {children}
    </div>
  )
}

export default Container