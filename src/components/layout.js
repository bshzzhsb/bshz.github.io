/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { Global } from "@emotion/core"
import { useStaticQuery, graphql } from "gatsby"
import { FcNext } from "react-icons/fc"

import Header from "./header"
import Footer from "./footer"
import Container from "./container"
import StickyResponsiveSidebar from "./sidebar/sticky-responsive-sidebar"
import { globalStyles } from "../utils/styles/global"
import { getItemList } from "../utils/sidebar/item-list"

function Layout({ children, location, mdxTitle, ...props }) {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )
  
  const itemList = getItemList()
  const scrollRef = React.useRef(null)

  return (
    <React.Fragment>
      <Global styles={globalStyles} />
      <Header mdxTitle={mdxTitle} siteTitle={data.site.siteMetadata.title} />
      <StickyResponsiveSidebar 
        itemList={itemList.items} 
        disableAccordions={itemList.disableAccordions}
        location={location} 
        title={itemList.title}
      />
      <div
        sx={{
          pl: [
            null,
            null,
            null,
            t => t.sizes.sidebarWidth.default,
            t => t.sizes.sidebarWidth.large,
          ],
        }}
      >
        <Container withSidebar={props.withSidebar} ref={scrollRef}>
          <main>{children}</main>
          <Footer />
        </Container>
      </div>
      <div sx={{
        position: `fixed`,
        bottom: `5rem`,
        right: `calc(1.5rem + 4px)`,
        cursor: `pointer`,
        bg: `rgba(0,0,0,0.05)`,
        borderRadius: `20px`,
        height: `48px`,
        width: `48px`,
        ":hover": {
          bg: `rgba(0,0,0,0.2)`
        }
      }} onClick={() => {window.scrollTo({top: 0, behavior: "smooth"})}}>
        <FcNext sx={{
          height: `40px`,
          width: `40px`,
          transform: `rotate(-90deg) translate(-3px, 4px)`,
        }} />
      </div>
    </React.Fragment>
  )
}

export default Layout
