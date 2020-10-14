/** @jsx jsx */
import { jsx } from "theme-ui"

function Tooltip({ content, top, left }) {

  return (
    <div
      className={className}
      sx={{
        position: `absolute`,
        bottom: `${top}px`,
        left: `${left}px`,
      }}
    >
      {content}
    </div>
  )
}

export default Tooltip