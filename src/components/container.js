/** @jsx jsx */
import { jsx } from "theme-ui"

function Container({ children, className }) {
  console.log(children, className)
  return (
    <div
      className={className}
      sx={{
        maxWidth: `42rem`,
        width: `100%`,
        mx: `auto`,
        px: t => [t.space[2], null, t.space[3], t.space[4]],
        py: t => [t.space[6], null, null, null, t.space[8]],
        position: `relative`,
      }}
    >
      {children}
      <div className={className} />
    </div>
  )
}

export default Container