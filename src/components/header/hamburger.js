/** @jsx jsx */
import { jsx } from "theme-ui"
import styled from "@emotion/styled"
import { mediaQueries } from "../../utils/styles/bshz-design-tokens"

const Line = styled.div`
  position: absolute;
  left: 25%;
  width: 50%;
  height: 2px;
  transform: translateY(-1px);
  background: ${t => t.theme.colors.blackFade[60]};
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.5s ease;
`

function Hamburger({ showSidebar, setShowSidebar }) {
  const w = 2.5

  return (
    <div
      sx={{
        mx: `1rem`,
        [mediaQueries.md]: {
          display: `none`,
        }
      }}
    >
      <div
        sx={{
          position: `relative`,
          display: `block`,
          width: `${w}rem`,
          height: `${w}rem`,
          cursor: `pointer`,
          transition: `0.5s ease-in-out`,
          zIndex: 100,
          float: `right`
        }}
        onClick={() => setShowSidebar(!showSidebar)}
      >
        <Line
          sx={{
            top: `30%`,
            transform: showSidebar && `translateY(${w / 5}em) rotate(45deg)`
          }}
        />
        <Line
          sx={{
            top: `50%`,
            transform: showSidebar && `scale(0)`
          }}
        />
        <Line
          sx={{
            top: `70%`,
            transform: showSidebar && `translateY(-${w / 5}em) rotate(-45deg)`
          }}
        />
      </div>
    </div>
  )
}

export default Hamburger