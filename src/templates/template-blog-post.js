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
import Container from "../components/container"

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
        TOC={post.tableOfContents}
        post={post}
      >
        <SEO title={post.frontmatter.title} />
        <div
          sx={{
            px: t => t.space[5],
            bg: t => t.colors.grey[5],
          }}
        >
          <h1
            sx={{
              fontFamily: t => t.fonts.noto,
              py: t => t.space[4],
              m: 0,
            }}
          >
            {post.frontmatter.title}
          </h1>
          <div
            sx={{
              mb: t => t.space[4],
              fontSize: t => t.fontSizes[1],
              color: t => t.colors.blackFade[80],
            }}
          >
            <BiTime className="icon" /> &nbsp;
            {formatDate(post.frontmatter.date)}
          </div>
        </div>
        <Container
          sx={{
            bg: t => t.colors.grey[10],
          }}
        >
          <main>
            <article
              sx={{
                bg: t => t.colors.white,
                borderRadius: t => t.space[4],
                overflow: `hidden`,
              }}
            >
              {post.frontmatter.image && (
                <div
                  sx={{
                    height: `200px`,
                    position: `relative`,
                    "&:before": {
                      content: `''`,
                      position: `absolute`,
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      backgroundImage: `url("${post.frontmatter.image.publicURL}")`,
                      backgroundPosition: `center`,
                      backgroundSize: `cover`,
                      opacity: 0.8,
                    },
                  }}
                />
              )}
              <div
                sx={{
                  p: t => t.space[7],
                }}
              >
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
              </div>
            </article>
            <Disqus disqusConfig={disqusConfig} />
          </main>
        </Container>
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
        image {
          publicURL
        }
      }
      tableOfContents(maxDepth: 4)
    }
  }
`