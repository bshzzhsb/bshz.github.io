import React from "react"
import { Helmet } from "react-helmet"
import { useLocation } from "@reach/router"

import useSiteMetadata from "../hooks/use-site-metadata"

function SEO({ description, title, article }) {
  console.log(title);
  const siteMetadata = useSiteMetadata()
  const location = useLocation()

  const seo = {
    title: title || siteMetadata.title,
    description: description || siteMetadata.description,
    url: `${siteMetadata.siteUrl}${location.pathname}`,
  }

  return (
    <Helmet
      title={seo.title}
      titleTemplate={`%s - ${siteMetadata.title}`}
    >
      <meta name="description" content={seo.description} />
      {(article ? true : null) && <meta property="og:type" content="article" />}
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
    </Helmet>
  )
}

export default SEO