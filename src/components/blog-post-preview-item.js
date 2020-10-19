/** @jsx jsx */
import { jsx } from "theme-ui"
import CodeIcon from "../assets/icons/code"

import Link from "./link"

const formatDate = dateString => {
  const date = new Date(dateString);
  return `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日`;
}

const Content = ({ post }) => {
  return (
    <div
      sx={{
        p: t => t.space[6],
        fontSize: `initial`,
        flex: 1,
      }}
    >
      <Link to={post.fields.slug} sx={{ "&&": t => t.colors.text.header }}>
        <h2
          sx={{
            color: t => t.colors.text.header,
            display: `inline-block`,
            my: 0,
            fontFamily: t => t.fonts.noto,
            fontWeight: t => t.fontWeights.body,
          }}
        >
          {post.frontmatter.title}
        </h2>
        <span
          sx={{
            float: `right`,
            fontFamily: t => t.fonts.dancingScript,
            color: t => t.colors.blackFade[60],
            fontSize: t => t.fontSizes[0],
          }}
        >
            {formatDate(post.frontmatter.date)}
          </span>
        <p
          sx={{
            height: post.frontmatter.type === "practice" && (t => t.space[11]),
            lineHeight: `2em`,
            color: t => t.colors.blackFade[60],
            fontSize: t => t.fontSizes[1],
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
  )
}

const Article = ({ post, className }) => {
  return (
    <article
      className={className}
      sx={{
        position: `relative`,
        borderRadius: t => t.space[4],
        overflow: `hidden`,
        fontSize: `0rem`,
        display: `flex`,
        flexDirection: `column`,
      }}
    >
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
      <Content post={post} />
    </article>
  )
}

const Note = ({ post, className }) => {
  return (
    <article
      className={className}
      sx={{
        position: `relative`,
        borderRadius: t => t.space[4],
        overflow: `hidden`,
        fontSize: `0rem`,
        display: `flex`,
        flexDirection: `row`,
        minHeight: `10rem`,
      }}
    >
      <Link
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
      />
      <Content post={post} />
    </article>
  )
}

const Default = ({ post, className }) => {
  return (
    <article
      className={className}
      sx={{
        position: `relative`,
        borderRadius: t => t.space[4],
        overflow: `hidden`,
        display: `flex`,
        flexDirection: `row`,
      }}
    >
      <div
        sx={{
          pt: t => t.space[6],
          pl: t => t.space[6],
        }}
      >
        <div
          sx={{
            minWidth: t => t.space[9],
            minHeight: t => t.space[9],
            borderRadius: `50%`,
            border: t => `${t.borders[1]} ${t.colors.grey[30]}`,
            fontSize: t => t.fontSizes[6],
            textAlign: `center`,
          }}
        >
          <CodeIcon />
        </div>
      </div>
      <Content post={post} />
    </article>
  )
}

const BlogPostPreviewItem = ({ post, className }) => {
  return (
    post.frontmatter.image
      ? post.frontmatter.type === "article"
        ? <Article post={post} className={className} />
        : <Note post={post} className={className} />
      : <Default post={post} className={className} />
  )
}

export default BlogPostPreviewItem