const config = require("../../config")

const postQuery = `{
  pages: allMdx {
    edges {
      node {
        objectID: id
        fields {
          slug
        }
        frontmatter {
          title
          excerpt
        }
        internal {
          content
        }
      }
    }
  }
}`

const flatten = arr => (
  arr.map(({ node: { frontmatter, internal, ...rest } }) => {
    if (internal.content.length > 5000) {
      const reg = /[^\x00-\xff]/g;
      internal.content = internal.content.match(reg).join("");
    }
    return { ...internal, ...frontmatter, ...rest }
  })
)

const settings = { attributesToSnippet: [`excerpt:20`] }

const queries = [
  {
    query: postQuery,
    transformer: ({ data }) => flatten(data.pages.edges),
    indexName: config.search.indexName,
    settings,
  },
]

module.exports = queries