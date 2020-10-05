const queries = require("./src/utils/algolia")

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})
console.log(process.env.ALGOLIA_ADMIN_KEY)

module.exports = {
  siteMetadata: {
    title: "博思何在",
    siteUrl: "https://blog.bshz.xyz",
    description: `There are things about Machine Learning, Deep Learning, Front-End and anything I am interested in.`,
    author: {
      name: `hsblock`,
      summary: `front-end programmer`,
      github: `https://github.com/hsblock`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `docs`,
        path: `${__dirname}/src/docs`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extension: [`.md`, `.mdx`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 768,
            }
          },
          {
            resolve: `gatsby-remark-katex`,
            options: {
              strict: `ignore`,
            }
          },
        ],
      }
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-emotion`,
      options: {},
    },
    `gatsby-plugin-theme-ui`,
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        indexName: process.env.ALGOLIA_INDEX_NAME,
        queries,
        chunkSize: 20000,
        enablePartialUpdates: false,
        matchFields: ['content'],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `博思何在`,
        short_name: `博思何在`,
        start_url: `/`,
        background_color: `#6b37bf`,
        theme_color: `#6b37bf`,
        display: `standalone`,
        icon: `src/assets/icons/maple.png`,
        crossOrigin: `use-credentials`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `blue`,
        showSpinner: false,
      }
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: `https://blog.bshz.xyz`,
        sitemap: `https://blog.bshz.xyz/sitemap.xml`,
        policy: [{ userAgent: `*`, allow: `/` }]
      }
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `bshzzhsb`
      }
    },
  ],
}
