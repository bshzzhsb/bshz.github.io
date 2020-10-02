const config = {
  site: {
    github: "https://github.com/hsblock"
  },
  search: {
    indexName: process.env.ALGOLIA_INDEX_NAME,
    algoliaAppId: process.env.ALGOLIA_APP_ID,
    algoliaSearchKey: process.env.ALGOLIA_SEARCH_KEY,
    algoliaAdminKey: process.env.ALGOLIA_ADMIN_KEY,
  },
}

module.exports = config