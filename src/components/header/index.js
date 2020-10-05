/** @jsx jsx */
import { jsx } from "theme-ui"
import { FaGithub } from "react-icons/fa"

import Hamburger from "./hamburger"
import Breadcrumb from "./breadcrumb"
import Search from "../search"
import config from "../../../config"
import Link from "../link"
import useSiteMetadata from "../../hooks/use-site-metadata"

const searchIndices = [
  {
    name: `${config.search.indexName}`,
    title: `Results`,
    hitComp: `PostHit`,
  }
]

function Header({siteTitle, mdxTitle, showSidebar, setShowSidebar, overrideCSS}) {
  const { author: { github } } = useSiteMetadata()

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
      <div
        sx={{
          display: `flex`,
          alignItems: `center`,
        }}
      >
        <Search collapse indices={searchIndices} />
        <Link
          to={github}
          target="_blank"
          sx={{
            mx: t => t.space[4],
          }}
        >
          <FaGithub />
        </Link>
        <Hamburger
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />
      </div>
    </header>
  )
}

export default Header