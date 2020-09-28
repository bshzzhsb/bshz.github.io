/** @jsx jsx */
import { jsx } from "theme-ui"
import Link from "./localized-link"

const formatDate = dateString =>
  new Date(dateString).toLocaleDateString(`en-EN`, {
    timeZone: `UTC`,
    month: `long`,
    day: `numeric`,
    year: `numeric`,
  })

const BlogPostPreviewItem = ({ post, className }) => (
  <article css={{ position: `relative` }} className={className}>
    <Link to={post.fields.slug} sx={{ "&&": { color: `card.color` } }}>
      <h2 sx={{ 
        color: `card.header`,
        mt: 0,
        display: `inline-block`,
        fontFamily: 'noto serif sc',
      }}>
        {post.frontmatter.title}
      </h2>
      <span sx={{
        float: `right`,
        fontFamily: `'Dancing Script', cursive;`,
      }}>
        {formatDate(post.frontmatter.date)}
      </span>
      <p>{post.fields.excerpt}</p>
    </Link>
    <div
      css={{
        display: `flex`,
        alignItems: `center`,
      }}
    >
      <div
        sx={{
          display: `inline-block`,
          fontFamily: `heading`,
          color: `card.color`,
        }}
      >
      </div>
    </div>
    <Link
      to={post.fields.slug}
      css={{
        position: `absolute`,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: `hidden`,
        textIndent: `-100%`,
        whiteSpace: `nowrap`,
        zIndex: 0,
        "&&": { border: 0 },
      }}
    >
      Read more
    </Link>
  </article>
)

export default BlogPostPreviewItem
