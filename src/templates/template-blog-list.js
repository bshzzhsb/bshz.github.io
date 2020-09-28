/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { graphql } from "gatsby"
import { TiTags as TagsIcon } from "react-icons/ti"
import { mediaQueries } from "gatsby-design-tokens/dist/theme-gatsbyjs-org"
import { pullIntoGutter, breakpointGutter } from "../utils/styles"

import Layout from "../components/layout"
import Button from "../components/button"
import Container from "../components/container"
import BlogPostPreviewItem from "../components/blog-post-preview-item"
import Pagination from "../components/pagination"
import PageMetadata from "../components/page-metadata"

class BlogPostsIndex extends React.Component {
  render() {
    const { edges: allMdx } = this.props.data.allMdx

    return (
      <Layout location={this.props.location}>
        <main id={`reach-skip-nav`}>
          <PageMetadata
            title={`Blog | Page ${this.props.pageContext.currentPage}`}
          />
          <Container>
            <div
              sx={{
                ...pullIntoGutter,
                display: `flex`,
                justifyContent: `space-between`,
                borderBottom: t => `1px solid ${t.colors.ui.border}`,
                mb: 6,
                pb: 6,
                [breakpointGutter]: {
                  pb: 0,
                  border: 0,
                },
              }}
            >
              <h1 sx={{ 
                mb: 0,
                fontFamily: 'Dancing Script',
              }}>
                Blog
              </h1>
              <Button
                key="blog-view-all-tags-button"
                to="/blog/"
                variant="small"
              >
                Tags(TODO) <TagsIcon />
              </Button>
            </div>
            {allMdx.map(({ node }, index) => (
              <BlogPostPreviewItem
                post={node}
                key={node.fields.slug}
                sx={{
                  borderBottomWidth: `1px`,
                  borderBottomStyle: `solid`,
                  borderColor: `ui.border`,
                  pb: 8,
                  mb: index === allMdx.length - 1 ? 0 : 8,
                  ...pullIntoGutter,
                  [breakpointGutter]: {
                    p: 9,
                    boxShadow: `raised`,
                    bg: `card.background`,
                    borderRadius: 2,
                    border: 0,
                    mb: 6,
                    mx: 0,
                    transition: t =>
                      `transform ${t.transition.default},  box-shadow ${t.transition.default}, padding ${t.transition.default}`,
                    "&:hover": {
                      transform: t => `translateY(-${t.space[1]})`,
                      boxShadow: `overlay`,
                    },
                    "&:active": {
                      boxShadow: `cardActive`,
                      transform: `translateY(0)`,
                    },
                  },
                  [mediaQueries.md]: {
                    marginLeft: t => `-${t.space[9]}`,
                    marginRight: t => `-${t.space[9]}`,
                  },
                }}
              />
            ))}
            <Pagination context={this.props.pageContext} />
          </Container>
        </main>
      </Layout>
    )
  }
}

export default BlogPostsIndex

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
