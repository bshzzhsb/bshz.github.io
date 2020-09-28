/** @jsx jsx */
import { jsx } from "theme-ui"

const Footer = () => (
  <footer sx={{
    textAlign: `center`,
    fontFamily: 'Gloria Hallelujah',
    fontSize: `12px`,
  }}>
    <div>争渡，争渡，惊起一滩鸥鹭</div>
    © {new Date().getFullYear()}, Built with
    {` `}
    <a href="https://www.gatsbyjs.org">Gatsby</a>
  </footer>
)

export default Footer