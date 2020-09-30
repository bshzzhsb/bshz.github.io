/** @jsx jsx */
import { jsx } from "theme-ui"

import Hamburger from "./hamburger"
import Breadcrumb from "./breadcrumb"

function Header({siteTitle, mdxTitle, overrideCSS}) {

  return (
    <header
      sx={{
        backgroundColor: t => `${t.colors.background}`,
        height: `3.2rem`,
        position: `fixed`,
        top: 0,
        zIndex: 100,
        display: `flex`,
        alignItems: `center`,
        justifyContent: `space-between`,
        boxShadow: `0 1px 5px 1px rgba(0,0,0,.05)`,
        ...overrideCSS,
      }}
    >
      <Breadcrumb siteTitle={siteTitle} mdxTitle={mdxTitle} />
      <Hamburger />
    </header>
  )
}

export default Header