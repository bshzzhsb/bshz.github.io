/** @jsx jsx */
import { jsx } from "theme-ui"
import { mediaQueries } from "../../utils/styles/bshz-design-tokens"

const Line = {
  position: `absolute`,
  left: `25%`,
  width: `50%`,
  height: `2px`,
  background: t => `${t.colors.blackFade[60]}`,
  borderRadius: `10px`,
  overflow: `hidden`,
  transition: t => `all ${t.transition.default}`,
}

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
        <div
          sx={{
            ...Line,
            top: `calc(30% - 1px)`,
            transform: showSidebar && `translateY(${w / 5}em) rotate(45deg)`,
          }}
        />
        <div
          sx={{
            ...Line,
            top: `calc(50% - 1px)`,
            transform: showSidebar && `scale(0)`,
          }}
        />
        <div
          sx={{
            ...Line,
            top: `calc(70% - 1px)`,
            transform: showSidebar && `translateY(-${w / 5}em) rotate(-45deg)`,
          }}
        />
      </div>
    </div>
  )
}

export default Hamburger