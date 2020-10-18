/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import BlogPostPreviewItem from "../components/blog-post-preview-item"
import Pagination from "../components/pagination"
import SEO from "../components/seo"

class BlogListTemplate extends React.Component {
  render() {
    const { edges: allMdx } = this.props.data.allMdx;

    return (
      <Layout location={this.props.location}>
        <SEO title={`Blog | Page ${this.props.pageContext.currentPage}`} />
        {allMdx.map(({ node }, index) => (
          <BlogPostPreviewItem
            post={node}
            key={node.fields.slug}
            sx={{
              p: 8,
              mx: 0,
              mb: t => t.space[8],
              boxShadow: t => t.shadows.raised,
              bg: t => t.colors.background,
              borderRadius: `4px`,
              border: 0,
              transition: t =>
                `transform ${t.transition.default}, box-shadow ${t.transition.default}`,
              "&:hover": {
                transform: t => `translateY(-${t.space[1]})`,
                boxShadow: t => t.shadows.overlay,
              },
              "&:active": {
                boxShadow: t => t.shadows.overlay,
                transform: `translateY(0)`,
              },
            }}
          />
        ))}
        <Pagination context={this.props.pageContext} />
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
            image {
              id
              relativePath
            }
          }
        }
      }
    }
  }
`