/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { mediaQueries } from "gatsby-design-tokens/dist/theme-gatsbyjs-org"

import Layout from "../components/layout"
import Container from "../components/container"
import FooterFeaturedForm from "../components/footer-featured-form"
import PrevAndNext from "../components/prev-and-next"
import PawClap from "../components/paw-clap"
import PageMetadata from "../components/page-metadata"
import TOC from "../components/toc"

class BlogPostTemplate extends React.Component {
  render() {
    const {
      pageContext: { prev, next },
      data: { mdx: post, site },
    } = this.props
    let disqusConfig = {
      url: `${site.siteMetadata.siteUrl+post.fields.slug}`,
      identifier: post.id,
      title: post.frontmatter.title,
    }

    return (
      <Layout location={this.props.location} mdxTitle={post.frontmatter.title}>
        <PageMetadata
          title={post.frontmatter.title}
        />
        <Container>
          {
            // TODO
            // - settle on `docSearch-content` as selector to identify
            //   Algolia DocSearch content
            // - make use of components/docsearch-content in place of <main>
            //
            // `post` and `post-body` are only in use as selectors in the
            // docsearch config for gatsbyjs.org for individual blog posts:
            // https://github.com/algolia/docsearch-configs/blob/89706210b62e2f384e52ca1b104f92bc0e225fff/configs/gatsbyjs.json#L71-L76
          }
          <main id={`reach-skip-nav`} 
            className="post docSearch-content">
            <div sx={{ display: `flex`, flexDirection: `column` }}>
              <h1
                sx={{
                  marginTop: 0,
                  order: 0,
                  letterSpacing: `tight`,
                  lineHeight: `dense`,
                  fontSize: [6, 7],
                  fontFamily: 'noto serif sc',
                  [mediaQueries.lg]: {
                    mb: 6,
                  },
                }}
              >
                {post.frontmatter.title}
              </h1>
              <span sx={{
                fontFamily: 'Dancing Script',
                mb: 2,
              }}>
                {site.siteMetadata.author.name} &nbsp;·&nbsp; {post.frontmatter.date}
              </span>
            </div>
            <section className="post-body">
              <MDXRenderer>{post.body}</MDXRenderer>
              {post.frontmatter.last_modified && 
                <p sx={{
                  textAlign: `right`,
                  fontSize: `14px`,
                  color: `textMuted`,
                  fontFamily: `'Dancing Script', cursive;`,
                }}>
                  {`last modified ${post.frontmatter.last_modified}`}
                </p>
              }
            </section>
            <div sx={{
              py: 8,
              overflow: `hidden`,
              textAlign: `center`,
            }}>
              <PawClap />
            </div>
            <div
              sx={{
                borderTop: t => `1px solid ${t.colors.ui.border}`,
                mt: 3,
                [mediaQueries.md]: { pt: 3 },
                [mediaQueries.lg]: { pt: 5 },
              }}
            >
              <Container>
                <PrevAndNext prev={prev} next={next} />
              </Container>
            </div>
            <FooterFeaturedForm disqusConfig={disqusConfig} />
          </main>
        </Container>
        <TOC toc={post.tableOfContents} />
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        siteUrl
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
