/** @jsx jsx */
import { jsx } from "theme-ui"

import Link from "./link"

const formatDate = dateString => (
  new Date(dateString).toLocaleDateString(`en-EN`, {
    timeZone: `UTC`,
    month: `long`,
    day: `numeric`,
    year: `numeric`
  })
)

const BlogPostPreviewItem = ({ post, className }) => {
  return (
    <article
      className={className}
      sx={{
        position: `relative`,
        "&:before": {
          content: `''`,
          position: `absolute`,
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          backgroundImage: `url("${post.frontmatter.image && post.frontmatter.image.publicURL}")`,
          backgroundPosition: `center`,
          backgroundSize: `cover`,
          opacity: 0.3,
        },
      }}
    >
      <Link to={post.fields.slug} sx={{ "&&": t => t.colors.text.header }}>
        <h2
          sx={{
            color: t => t.colors.text.header,
            display: `inline-block`,
            mt: 0,
            fontFamily: t => t.fonts.noto,
          }}
        >
          {post.frontmatter.title}
        </h2>
        <span
          sx={{
            float: `right`,
            fontFamily: t => t.fonts.dancingScript
          }}
        >
          {formatDate(post.frontmatter.date)}
        </span>
        <p>{post.fields.excerpt}</p>
      </Link>
      <Link
        to={post.fields.slug}
        sx={{
          position: `absolute`,
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          overflow: `hidden`,
          textIndent: `-100%`
        }}
      >
        Read more
      </Link>
    </article>
  )
}

export default BlogPostPreviewItem