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
  console.log(post, post.frontmatter.type)
  return (
    <article
      className={className}
      sx={{
        position: `relative`,
        borderRadius: t => t.space[4],
        overflow: `hidden`,
        fontSize: `0rem`,
        display: `flex`,
        flexDirection: post.frontmatter.type === "practice" ? `row` : `column`,
      }}
    >
      {post.frontmatter.image && post.frontmatter.type !== "practice" && (
        <Link
          to={post.fields.slug}
          sx={{
            width: `100%`,
            height: [`200px`, null, null, null, `250px`],
            position: `relative`,
            display: `inline-block`,
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
      {post.frontmatter.image && post.frontmatter.type === "practice" && <Link
        to={post.fields.slug}
        sx={{
          width: `40%`,
          position: `relative`,
          display: `inline-block`,
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
      />}
      <div
        sx={{
          p: t => t.space[7],
          fontSize: `initial`,
        }}
      >
        <Link to={post.fields.slug} sx={{ "&&": t => t.colors.text.header }}>
          <h2
            sx={{
              color: t => t.colors.text.header,
              display: `inline-block`,
              my: 0,
              fontFamily: t => t.fonts.noto,
            }}
          >
            {post.frontmatter.title}
          </h2>
          <span
            sx={{
              float: `right`,
              fontFamily: t => t.fonts.dancingScript,
              color: t => t.colors.blackFade[60],
            }}
          >
            {formatDate(post.frontmatter.date)}
          </span>
          <p
            sx={{
              height: post.frontmatter.type === "practice" && (t => t.space[11]),
              lineHeight: t => t.space[7],
              color: t => t.colors.blackFade[60],
            }}
          >
            {post.fields.excerpt}
          </p>
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
      </div>
    </article>
  )
}

export default BlogPostPreviewItem