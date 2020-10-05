import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = ({ location }) => {
  return (
    <Layout location={location}>
      <SEO title="404: Not Found" />
      <h1>NOT FOUND</h1>
    </Layout>
  )
}

export default NotFoundPage