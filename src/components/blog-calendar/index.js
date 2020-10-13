/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql, useStaticQuery } from "gatsby"

import Calendar from "./calendar"

function BlogCalendar() {

  const { allMdx: data } = useStaticQuery(
    graphql`
      query {
        allMdx(
          sort: { order: DESC, fields: [frontmatter___date, fields___slug] }
          filter: { fields: { released: { eq: true } } }
        ) {
          edges {
            node {
              fields {
                slug
                excerpt
              }
              frontmatter {
                title
                date
              }
            }
          }
        }
      }
    `
  )
  console.log(data)
  let dateArr = [];
  for (const edge of data.edges) {
    let date = edge.node.frontmatter.date.split("-").map((item) => +item);
    dateArr.push(date)
  }

  return (
    <div>
      <Calendar dateArr={dateArr} />
    </div>
  )
}

export default BlogCalendar
