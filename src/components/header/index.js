import React from "react"
import styled from "@emotion/styled"

const HeaderContainer = styled.header`
  background-color: hsla(231deg, 48%, 48%, 1);
  height: 3.2rem;
  width: 100%;
  position: fixed;
  zIndex: 100;
`

function Header({siteTitle, mdxTitle}) {
  // const [isActive, setIsActive] = React.useState(false);

  return (
    <HeaderContainer>
      {siteTitle} {mdxTitle}
    </HeaderContainer>
  )
}

export default Header