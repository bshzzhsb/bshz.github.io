/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import styled from "@emotion/styled"
import { Disqus } from "gatsby-plugin-disqus"

import { mediaQueries } from "gatsby-design-tokens/dist/theme-gatsbyjs-org"

const Container = styled(`div`)`
  background: ${p => p.theme.colors.newsletter.background};
  box-shadow: ${p => p.theme.shadows.floating},
    inset 0 0 0 1px ${p => p.theme.colors.newsletter.border};
  border-radius: ${p => p.theme.radii[2]};
  margin-top: ${p => p.theme.space[4]};
  padding: calc(${p => p.theme.space[6]} * 1.2);
  padding-bottom: calc(${p => p.theme.space[4]});
  position: relative;

  :after {
    border-radius: 0 0 ${p => p.theme.radii[2]} ${p => p.theme.radii[2]};
    background: ${p => p.theme.colors.newsletter.background}
      repeating-linear-gradient(
        135deg,
        ${p => p.theme.colors.newsletter.stripeColorA},
        ${p => p.theme.colors.newsletter.stripeColorA} 20px,
        transparent 20px,
        transparent 40px,
        ${p => p.theme.colors.newsletter.stripeColorB} 40px,
        ${p => p.theme.colors.newsletter.stripeColorB} 60px,
        transparent 60px,
        transparent 80px
      );
    bottom: 0;
    content: "";
    height: ${p => p.theme.space[1]};
    left: 0;
    right: 0;
    position: absolute;
  }

  ${mediaQueries.lg} {
    flex-direction: row;
    justify-content: space-between;

    > * {
      flex-basis: 50%;
    }
  }
`

function FooterFeaturedForm({
  disqusConfig
}) {

  return (
    <React.Fragment>
      <Container sx={{
        color: `newsletter.heading`,
        fontWeight: `bold`,
        fontSize: 3,
        fontFamily: `heading`,
        lineHeight: `dense`,
      }}>
        <Disqus config={disqusConfig} />
      </Container>
    </React.Fragment>
  )
}

export default FooterFeaturedForm
