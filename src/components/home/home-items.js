import React from "react"
import PropTypes from "prop-types"
import styled from "@emotion/styled"
import { mediaQueries } from "gatsby-design-tokens/dist/theme-gatsbyjs-org"

import { HorizontalScrollerItem } from "../home/horizontal-scroller"

const EcosystemFeaturedItemRoot = styled(HorizontalScrollerItem)`
  margin-right: ${p => p.theme.space[6]};

  ${mediaQueries.md} {
    border-bottom: 1px solid ${p => p.theme.colors.ui.border};
    box-shadow: none;
    margin: 0;
    padding: 0;
    width: auto;
  }
`

export const BlockLink = styled(`div`)`
  background: ${p => p.theme.colors.card.background};
  border-radius: ${p => p.theme.radii[2]};
  box-shadow: ${p => p.theme.shadows.raised};
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: ${p => p.theme.space[6]};
  cursor: pointer;

  ${mediaQueries.md} {
    border-radius: 0;
    box-shadow: none;
    transition: all ${p => p.theme.transition.speed.default}
      ${p => p.theme.transition.curve.default};
  }

  ${mediaQueries.lg} {
    :hover {
      background: ${p => p.theme.colors.ui.hover};
    }
  }
`

const Header = styled(`header`)`
  align-items: flex-start;
  display: flex;
  justify-content: space-between;

  h3 {
    color: ${p => p.theme.colors.heading};
    font-size: ${p => p.theme.fontSizes[2]};
    margin: 0;
  }

  span {
    align-items: center;
    color: ${p => p.theme.colors.textMuted};
    display: flex;
    font-size: ${p => p.theme.fontSizes[1]};
    padding-left: ${p => p.theme.space[3]};

    svg {
      fill: ${p => p.theme.colors.textMuted};
      height: auto;
      margin-left: ${p => p.theme.space[1]};
      width: ${p => p.theme.space[4]};
    }
  }
`

const Digest = styled(`div`)`
  display: flex;
  flex-grow: 1;
  font-family: ${p => p.theme.fonts.system};
  justify-content: space-between;
  padding: ${p => p.theme.space[3]} 0 0;
`

const Description = styled(`p`)`
  color: ${p => p.theme.colors.textMuted};
  flex-grow: 1;
  font-size: ${p => p.theme.fontSizes[1]};
  margin: 0;
`

const EcosystemFeaturedItem = ({ item, className }) => {
  const {
    name,
    description,
  } = item

  const descriptionHtml = {__html: description}

  return (
    <EcosystemFeaturedItemRoot className={className}>
      <BlockLink>
        <Header>
          <h3>{name}</h3>
        </Header>
        <Digest>
          <Description dangerouslySetInnerHTML={descriptionHtml}></Description>
        </Digest>
      </BlockLink>
    </EcosystemFeaturedItemRoot>
  )
}

EcosystemFeaturedItem.propTypes = {
  item: PropTypes.object.isRequired,
  className: PropTypes.string,
}

export default EcosystemFeaturedItem
