/** @jsx jsx */
import { jsx } from "theme-ui"
import styled from "@emotion/styled"

import Hamburger from "./hamburger"
import Breadcrumb from "./breadcrumb"

const HeaderContainer = styled.header`
  background-color: ${t => t.theme.colors.background};
  height: 3.2rem;
  width: 100%;
  position: fixed;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 5px 1px rgba(0,0,0,.05);
`

function Header({siteTitle, mdxTitle}) {
  // const [isActive, setIsActive] = React.useState(false);

  return (
    <HeaderContainer>
      <Breadcrumb siteTitle={siteTitle} mdxTitle={mdxTitle} />
      <Hamburger />
    </HeaderContainer>
  )
}

export default Header