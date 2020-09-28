import React from "react"
import { Global } from "@emotion/core"
import { graphql, useStaticQuery } from "gatsby"

import Header from "./header"
import Container from "./container"
import { globalStyles } from "../utils/styles/global"

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

  return (
    <React.Fragment>
      <Global styles={ globalStyles } />
      <Header mdxTitle={mdxTitle} siteTitle={data.site.siteMetadata.title} />
      <Container withSidebar={props.withSidebar}>
        <main>{children}</main>
      </Container>
      {/*// TODO: Footer*/}
    </React.Fragment>
  )
}

export default Layout