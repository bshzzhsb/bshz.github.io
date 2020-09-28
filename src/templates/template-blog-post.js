import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"

class BlogPostTemplate extends React.Component {
  render() {
    const { data: { mdx: post } } = this.props
    console.log(this.props)

    return (
      <Layout location={this.props.location}>
        <h1>{ post.frontmatter.title }</h1>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
        author {
          name
        }
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      body
      fields {
        slug
        excerpt
      }
      frontmatter {
        title
        date(formatString: "MMMM Do YYYY")
        last_modified(formatString: "MMMM Do YYYY")
      }
      tableOfContents
    }
  }
`