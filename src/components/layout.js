/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { Global } from "@emotion/core"
import { graphql, useStaticQuery } from "gatsby"

import Header from "./header"
import Container from "./container"
import StickyResponsiveSidebar from "./sidebar"
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

  return (
    <React.Fragment>
      <Global styles={ globalStyles } />
      <div
        sx={{
          pt: `3.2rem`, // ${t.vars.headerHeight}
        }}
      >
        <Header mdxTitle={mdxTitle} siteTitle={data.site.siteMetadata.title} />
        <StickyResponsiveSidebar
          itemList={itemList.items}
          location={location}
          mdxTitle={mdxTitle}
        />
        <Container withSidebar={props.withSidebar}>
          <main>{children}</main>
        </Container>
        {/*// TODO: Footer*/}
      </div>
    </React.Fragment>
  )
}

export default Layout