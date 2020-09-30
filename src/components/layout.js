/** @jsx jsx */
import { jsx } from "theme-ui"
import { Global } from "@emotion/core"
import { graphql, useStaticQuery } from "gatsby"

import Header from "./header"
import Container from "./container"
import StickyResponsiveSidebar from "./sidebar"
import { globalStyles } from "../utils/styles/global"
import { getItemList } from "../utils/sidebar/item-list"
import { mediaQueries } from "../utils/styles/bshz-design-tokens"

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
    <div
      sx={{
        display: `block`,
        width: [`100%`, `100%`,`100%`, `750px`, `980px`, `1170px`],
        mx: `auto`,
        boxShadow: `0 0 4px 3px rgba(0,0,0,.05)`,
      }}
    >
      <Global styles={ globalStyles } />
      <div
        sx={{
          pt: `3.2rem`, // ${t.vars.headerHeight}
          display: `flex`,
          justifyContent: `center`,
          position: `relative`,
          minHeight: `100vh`,
        }}
      >
        <Header
          mdxTitle={mdxTitle}
          siteTitle={data.site.siteMetadata.title}
          overrideCSS={{
            width: [`100%`, `100%`,`100%`, `750px`, `980px`, `1170px`],
          }}
        />
        <div
          sx={{
            display: `flex`,
            width: [`100%`, `100%`,`100%`, `750px`, `980px`, `1170px`],
          }}
        >
          <StickyResponsiveSidebar
            itemList={itemList.items}
            location={location}
            mdxTitle={mdxTitle}
            overrideCSS={{
              width: `16rem`,
            }}
          />
          <div
            sx={{
              flex: 1,
              [mediaQueries.md]: {
                pl: `16rem`,
              }
            }}
          >
            <Container
              withSidebar={props.withSidebar}
            >
              <main>{children}</main>
            </Container>
          </div>
        </div>
        {/*// TODO: Footer*/}
      </div>
    </div>
  )
}

export default Layout