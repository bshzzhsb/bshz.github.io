/** @jsx jsx */
import { jsx } from "theme-ui"

const Footer = () => (
  <footer
    sx={{
      my: t => t.space[6],
      textAlign: `center`,
      fontFamily: t => t.fonts.gloria,
      fontSize: t => t.fontSizes[0],
    }}
  >
    <div>争渡，争渡，惊起一滩鸥鹭</div>
    © {new Date().getFullYear()}, Built with
    {` `}
    <a href="https://www.gatsbyjs.org">Gatsby</a>
  </footer>
)

export default Footer