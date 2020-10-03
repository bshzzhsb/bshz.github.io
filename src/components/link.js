/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link as GatsbyLink } from "gatsby"

const Link = ({ to, children, ...props }) => {
  if (to) {
    return (
      <GatsbyLink
        to={to}
        {...props}
        sx={{
          color: t => t.colors.text,
        }}
      >
        {children}
      </GatsbyLink>
    )
  }
  return <span {...props}>{ children }</span>
}

export default Link