/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link as GatsbyLink } from "gatsby"

const Link = ({ to, children, className }) => {
  if (to) {
    return (
      <GatsbyLink
        to={to}
        className={className}
        sx={{
          color: t => t.colors.text,
        }}
      >
        {children}
      </GatsbyLink>
    )
  }
  return <span className={className}>{ children }</span>
}

export default Link