/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import Calendar from "./calendar"

function BlogCalendar() {
  const calendar = React.useRef();
  const showTooltip = () => {
    console.log(calendar.current)
  }

  const { allMdx: data, allCommitsYaml: { edges: commitNodes } } = useStaticQuery(
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
        allCommitsYaml {
          edges {
            node {
              id
              date
              message
              version
            }
          }
        }
      }
    `
  )

  console.log(commits)

  const [year, setYear] = React.useState(new Date().getFullYear())

  let blogs = [];
  for (const edge of data.edges) {
    let obj = {};
    obj.date = edge.node.frontmatter.date.split("-").map((item) => +item);
    obj.type = "blog";
    obj.title = edge.node.frontmatter.title;
    obj.slug = edge.node.fields.slug;
    blogs.push(obj);
  }

  let commits = []
  for (const commitNode of commitNodes) {
    let obj = {};
    obj.date = commitNode.node.date.split("-").map(item => parseInt(item));
    obj.type = "commit";
    obj.version = commitNode.node.version;
    obj.message = commitNode.node.message;
    commits.push(obj);
  }

  return (
    <div
      ref={calendar}
    >
      <div
        sx={{
          border: t => `${t.borders[1]} ${t.colors.blackFade[20]}`,
          borderRadius: t => t.space[4],
          px: t => t.space[6],
          py: t => t.space[4],
          overflow: `hidden`,
        }}
      >
        <div>{year}</div>
        <Calendar blogs={blogs} commits={commits} cb={showTooltip} />
      </div>
    </div>
  )
}

export default BlogCalendar
