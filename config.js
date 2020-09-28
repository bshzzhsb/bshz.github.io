const config = {
  site: {
    siteUrl: 'https://blog.bshz.xyz',
    github: 'https://github.com/hsblock'
  },
  header: {
    search: {
      enabled: false,
      indexName: process.env.ALGOLIA_INDEX_NAME,
      algoliaAppId: process.env.ALGOLIA_APP_ID,
      algoliaSearchKey: process.env.ALGOLIA_SEARCH_KEY,
      algoliaAdminKey: process.env.ALGOLIA_ADMIN_KEY,
    },
  },
}

module.exports = config