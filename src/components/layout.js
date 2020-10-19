/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { Global } from "@emotion/core"
import { graphql, useStaticQuery } from "gatsby"

import Header from "./header"
import Footer from "./footer"
import Container from "./container"
import StickyResponsiveSidebar from "./sidebar"
import { globalStyles } from "../utils/styles/global"
import { getItemList } from "../utils/sidebar/item-list"
import { mediaQueries } from "../utils/styles/bshz-design-tokens"
import RightSidebar from "./right-sidebar"

function Layout({ children, location, mdxTitle, TOC, img, ...props }) {
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

  const [showSidebar, setShowSidebar] = React.useState(false);

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
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          sx={{
            width: [`100%`, `100%`,`100%`, `750px`, `980px`, `1170px`],
            bg: t => t.colors.grey[5],
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
            showSidebar={showSidebar}
            sx={{
              width: [`200px`, null, null, null, `220px`],
              background: t => t.colors.grey[5],
            }}
          />
          <div
            sx={{
              flex: 1,
              overflow: `hidden`,
              display: `flex`,
              flexDirection: `column`,
              justifyContent: `space-between`,
              [mediaQueries.md]: {
                pl: `200px`,
              },
              [mediaQueries.lg]: {
                pl: `220px`,
              },
            }}
          >
            <div
              sx={{
                height: `200px`,
                position: `relative`,
                "&:before": {
                  content: `''`,
                  position: `absolute`,
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  backgroundImage: `url("${img}")`,
                  backgroundPosition: `center`,
                  backgroundSize: `cover`,
                  opacity: 0.8,
                },
              }}
            />
            <Container
              withSidebar={props.withSidebar}
              sx={{
                bg: t => t.colors.grey[10],
              }}
            >
              <main>{children}</main>
            </Container>
            <Footer />
          </div>
          <div
            sx={{
              width: `200px`,
              background: t => t.colors.grey[5],
              display: `none`,
              pl: t => t.space[2],
              [mediaQueries.lg]: {
                display: `block`,
              },
            }}
          >
            <RightSidebar
              TOC={TOC}
              sx={{
                position: `sticky`,
                top: `4.2rem`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout