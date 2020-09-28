/** @jsx jsx */
import { jsx } from "theme-ui"
import {FcLink} from "react-icons/fc"
import { IoMdBeer } from "react-icons/io"
import { Link } from "gatsby"
import { css } from "@emotion/core";

import Layout from "../components/layout"
import PageMetadata from "../components/page-metadata"
import Container from "../components/container"
import HomepageEcosystem from "../components/home/home-item-list"
import { homeItems } from "../data/home-items"
import PawClap from "../components/paw-clap"

const BlogIndex = () => {

  const location = { pathname: "/index" }
  
  return (
    <Layout location={ location }>
      <PageMetadata
        title={`博思何在`}
      />
      <Container>
        <div>
          <h1
            css={css`
              display: inline-block;
            `}
          >
            Welcome!&nbsp;
            <IoMdBeer />
          </h1>
          <h4>Find Your Answer HERE!</h4>
          <h4>Can't wait to see the blogs? &nbsp;<Link to={`/blog/`}>GO<FcLink /></Link></h4>
          <HomepageEcosystem featuredItems={homeItems} />
        </div>
        <PawClap />
      </Container>
    </Layout>
  )
}

export default BlogIndex
