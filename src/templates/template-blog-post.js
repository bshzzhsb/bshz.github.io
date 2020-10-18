/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Disqus from "../components/disqus"
import PrevAndNext from "../components/prev-and-next"

class BlogPostTemplate extends React.Component {
  render() {
    const {
      pageContext: { prev, next },
      data: { mdx: post, site },
    } = this.props
    const disqusConfig = {
      url: `${site.siteMetadata.siteUrl+post.fields.slug}`,
      identifier: post.id,
      title: post.frontmatter.title,
    }

    return (
      <Layout
        location={this.props.location}
        mdxTitle={post.frontmatter.title}
      >
        <SEO title={post.frontmatter.title} />
        <article>
          <h1
            sx={{
              fontFamily: t => `${t.fonts.noto}`
            }}
          >
            {post.frontmatter.title}
          </h1>
          <div sx={{
            fontFamily: t => `${t.fonts.dancingScript}`,
            mb: t => t.space[4],
          }}>
            {site.siteMetadata.author.name} &nbsp; {post.frontmatter.date}
          </div>
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
          <div>
            <PrevAndNext prev={prev} next={next} />
          </div>
          <Disqus disqusConfig={disqusConfig} />
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
        siteUrl
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