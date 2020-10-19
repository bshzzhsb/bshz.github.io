/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql, useStaticQuery } from "gatsby"

import Calendar from "./month-calendar"

function MonthCalendar() {
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
            }
          }
        }
      }
    `
  )

  const year = new Date().getFullYear();

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
    <div>
      <div
        sx={{
          height: t => t.space[8],
          lineHeight: t => t.space[8],
        }}
      >
        {`${year} contributions`}
      </div>
      <div
        sx={{
          border: t => `${t.borders[1]} ${t.colors.blackFade[20]}`,
          borderRadius: t => t.space[4],
          px: t => t.space[6],
          overflow: `hidden`,
        }}
      >
        <Calendar blogs={blogs} commits={commits} />
      </div>
    </div>
  )
}

export default MonthCalendar
