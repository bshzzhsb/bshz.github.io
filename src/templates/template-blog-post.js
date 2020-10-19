/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { BiTime } from "react-icons/all"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Disqus from "../components/disqus"
import PrevAndNext from "../components/prev-and-next"
import formatDate from "../utils/get-locale-date"

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
    console.log(post)

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
            mb: t => t.space[4],
            fontSize: t => t.fontSizes[1],
            color: t => t.colors.blackFade[80],
          }}>
            <BiTime className="icon" />
            {formatDate(post.frontmatter.date)}
          </div>
          <section>
            <MDXRenderer>{ post.body }</MDXRenderer>
            {post.frontmatter.last_modified &&
              <p sx={{
                textAlign: `right`,
                fontSize: t => t.fontSizes[1],
                color: t => t.colors.blackFade[80],
              }}>
                {`最后修改于${formatDate(post.frontmatter.last_modified)}`}
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
        date
        last_modified
      }
      tableOfContents
    }
  }
`