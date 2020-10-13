/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { FcLink } from "react-icons/fc"

import Layout from "../components/layout"
import Link from "../components/link"
import HomeItemList from "../components/home/home-item-list"
import homeItems from "../data/home-items"
import SEO from "../components/seo"
import BlogCalendar from "../components/blog-calendar"

export default function Home({ location }) {
  return (
    <Layout location={location}>
      <SEO />
      <div>
        <h1>
          Welcome!
        </h1>
        <h4>Find Your Answer HERE!</h4>
        <h4>Can't wait to see the blogs? &nbsp;
          <Link
            to={`/blog/`}
            sx={{
              color: t => t.colors.blue[60]
            }}
          >
            GO
            <FcLink/>
          </Link>
        </h4>
        <BlogCalendar />
        <HomeItemList homeItems={homeItems} />
      </div>
    </Layout>
  )
}
