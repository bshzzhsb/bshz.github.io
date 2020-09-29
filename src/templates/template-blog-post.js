/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../components/layout"

class BlogPostTemplate extends React.Component {
  render() {
    const { data: { mdx: post, site } } = this.props

    return (
      <Layout
        location={this.props.location}
        mdxTitle={post.frontmatter.title}
      >
        <article>
          <h1>{post.frontmatter.title}</h1>
          <span sx={{
            fontFamily: t => `${t.fonts.dancingScript}`,
            mb: `2rem`,
          }}>
            {site.siteMetadata.author.name} &nbsp; {post.frontmatter.date}
          </span>
          <section>
            <MDXRenderer>{ post.body }</MDXRenderer>
            {post.frontmatter.last_modified &&
              <p sx={{
                textAlign: `right`,
                fontSize: `0.8rem`,
                fontFamily: t => `${t.fonts.dancingScript}`,
              }}>
                {`last modified ${post.frontmatter.last_modified}`}
              </p>
            }
          </section>
        </article>
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