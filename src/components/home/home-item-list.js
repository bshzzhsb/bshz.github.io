/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import PropTypes from "prop-types"
import styled from "@emotion/styled"
import { FcMusic } from "react-icons/fc"

import EcosystemFeaturedItem, {
  BlockLink as FeaturedItemBlockLink,
} from "./home-items"
import {
  HorizontalScroller,
  HorizontalScrollerContent,
} from "./horizontal-scroller"
import { mediaQueries } from "gatsby-design-tokens/dist/theme-gatsbyjs-org"

const SubTitle = styled(`h3`)`
  font-size: ${p => p.theme.fontSizes[3]};
  margin-bottom: ${p => p.theme.space[6]};
  margin-top: ${p => p.theme.space[7]};
`

const FeaturedItems = styled(HorizontalScroller)`
  margin: 0 -${p => p.theme.space[6]};

  ${mediaQueries.lg} {
    margin: 0;
    overflow-x: visible;
  }
`

const FeaturedItemsList = styled(HorizontalScrollerContent)`
  ${mediaQueries.lg} {
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
    width: 100%;
  }
`

const FeaturedItem = styled(EcosystemFeaturedItem)`
  margin-right: ${p => p.theme.space[6]};

  ${mediaQueries.md} {
    border-bottom: none;
    margin: ${p => p.theme.space[6]};
    margin-top: 0;
    margin-left: 0;
    width: 20rem;
  }

  ${mediaQueries.lg} {
    flex-basis: 45%;

    :nth-of-type(3n) {
      margin-left: ${p => p.theme.space[6]};
    }
    :nth-of-type(4n) {
      margin-right: 0;
    }
  }

  ${FeaturedItemBlockLink} {
    padding-left: calc(${p => p.theme.space[5]} + ${props =>
  props.theme.space[6]});
    position: relative;
    border: 0;
    box-shadow: ${p => p.theme.shadows.raised};

    ${mediaQueries.md} {
      border-radius: ${p => p.theme.radii[2]};
    }

    ${mediaQueries.lg} {
      :hover {
        background: ${p => p.theme.colors.ui.hover};
      }
    }

    :before {
      background: ${props =>
        props.item.type === `Explore`
          ? `#eeebff`
          : `#e6f5f5`};
      border-radius: ${p => p.theme.radii[2]} 0 0 ${props =>
  props.theme.radii[2]};
      bottom: 0;
      content: "";
      left: 0;
      position: absolute;
      top: 0;
      width: ${p => p.theme.space[5]};
    }

    :after {
      bottom: 0;
      content: "${props => props.item.type}";
      color: ${props =>
        props.item.type === `Explore`
          ? `#4764ff`
          : `#00bdb6`};
      font-family: ${p => p.theme.fonts.heading};
      font-size: ${p => p.theme.fontSizes[0]};
      left: 0;
      letter-spacing: ${p => p.theme.letterSpacings.tracked};
      text-transform: uppercase;
      position: absolute;
      transform: rotate(-90deg) translate(-0.5em, -0);
      transform-origin: top left;
    }
  }
`

const HomepageEcosystem = ({ featuredItems }) => (
  <React.Fragment>
    <SubTitle>
      <FcMusic />
      There are Things about
    </SubTitle>
    <FeaturedItems className={`scrollerWithLead`}>
      <FeaturedItemsList>
        {featuredItems
          .map(item => {
            const { name } = item
            return <FeaturedItem key={name} item={item} />
          })}
      </FeaturedItemsList>
    </FeaturedItems>
  </React.Fragment>
)

HomepageEcosystem.propTypes = {
  featuredItems: PropTypes.array.isRequired,
}

export default HomepageEcosystem
