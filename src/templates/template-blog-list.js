import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"

class BlogListTemplate extends React.Component {
  render() {
    const { edges: allMdx } = this.props.data.allMdx;

    return (
      <Layout>
        {allMdx.map(({ node }, index) => (
          node.frontmatter.title
        ))}
      </Layout>
    )
  }
}

export default BlogListTemplate

export const pageQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMdx(
      sort: { order: DESC, fields: [frontmatter___date, fields___slug] }
      filter: { fields: { released: { eq: true } } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          fields {
            slug
            excerpt
          }
          frontmatter {
            title
            date
          }
        }
      }
    }
  }
`