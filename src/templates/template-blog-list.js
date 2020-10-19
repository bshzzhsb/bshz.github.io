/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import BlogPostPreviewItem from "../components/blog-post-preview-item"
import Pagination from "../components/pagination"
import SEO from "../components/seo"
import Container from "../components/container"

class BlogListTemplate extends React.Component {
  render() {
    const { edges: allMdx } = this.props.data.allMdx;

    return (
      <Layout location={this.props.location}>
        <SEO title={`Blog | Page ${this.props.pageContext.currentPage}`} />
        <Container
          sx={{
            bg: t => t.colors.grey[10],
          }}
        >
          <main>
            {allMdx.map(({ node }, index) => (
              <BlogPostPreviewItem
                post={node}
                key={node.fields.slug}
                sx={{
                  mx: 0,
                  mt: t => t.space[4],
                  mb: t => t.space[7],
                  boxShadow: t => t.shadows.raised,
                  bg: t => t.colors.background,
                  borderRadius: `4px`,
                  border: `1px solid rgba(46, 41, 51, 0.08)`,
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
          </main>
        </Container>
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
            type
            image {
              id
              publicURL
            }
          }
        }
      }
    }
  }
`