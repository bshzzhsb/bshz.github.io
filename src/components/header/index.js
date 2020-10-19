/** @jsx jsx */
import { jsx } from "theme-ui"
import { FaGithub } from "react-icons/fa"

import Hamburger from "./hamburger"
import Breadcrumb from "./breadcrumb"
import Search from "../search"
import config from "../../../config"
import useSiteMetadata from "../../hooks/use-site-metadata"

const searchIndices = [
  {
    name: `${config.search.indexName}`,
    title: `Results`,
    hitComp: `PostHit`,
  }
]

function Header({siteTitle, mdxTitle, showSidebar, setShowSidebar, className}) {
  const { author: { github } } = useSiteMetadata()

  return (
    <header
      className={className}
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
        <a
          href={github}
          target="_blank"
          rel="noreferrer"
          sx={{
            mx: t => t.space[4],
          }}
        >
          <FaGithub />
        </a>
        <Hamburger
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />
      </div>
    </header>
  )
}

export default Header