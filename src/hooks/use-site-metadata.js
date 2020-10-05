import { graphql, useStaticQuery } from "gatsby"

function useSiteMetadata() {
  const { site } = useStaticQuery(graphql`
    query SiteMetadata {
      site {
        siteMetadata {
          siteUrl
          title
          description
          author {
            name
            summary
            github
          }
        }
      }
    }
  `)
  return site.siteMetadata
}

export default useSiteMetadata
