module.exports = {
  siteMetadata: {
    title: "博思何在",
    siteUrl: "https://blog.bshz.xyz",
    description: `There are things about Machine Learning, Deep Learning, Front-End and anything I am interested in.`,
    author: {
      name: `hsblock`,
      summary: `front-end programmer`,
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
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {
                env: `bash`,
                es6: `js`,
                gql: `graphql`,
                mdx: `markdown`,
              }
            }
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            }
          },
        ],
        remarkPlugins: [],
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
  ],
}
