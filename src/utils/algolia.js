const config = require('../../config.js')

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

const flatten = arr =>
  arr.map(({ node: { frontmatter, internal, ...rest } }) => {
    if(internal.content.length > 5000) {
      // 匹配汉字[\u4e00-\u9fa5]，
      // 匹配双字节字符[^\x00-\xff]
      // 匹配中英文及标点\\w*|\\W*|[\\u4e00-\\u9fa5]
      const reg = /[^\x00-\xff]/g
      internal.content = internal.content.match(reg).join("")
    }
    return {
      ...internal,
      ...frontmatter,
      ...rest,
    }
  })

const settings = { attributesToSnippet: [`excerpt:20`] }

const queries = [
  {
    query: postQuery,
    transformer: ({ data }) => flatten(data.pages.edges),
    indexName: config.header.search.indexName,
    settings,
  },
]

module.exports = queries