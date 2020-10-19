/** @jsx jsx */
import { jsx } from "theme-ui"

function Container({ children, className }) {
  console.log(children, className)
  return (
    <div
      className={className}
      sx={{
        width: `100%`,
        px: t => [t.space[2], null, t.space[3], t.space[4]],
        py: t => [t.space[2], null, null, null, t.space[4]],
        position: `relative`,
      }}
    >
      {children}
      <div className={className} />
    </div>
  )
}

export default Container