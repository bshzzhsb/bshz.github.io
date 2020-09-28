/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes from "prop-types"
import { FcSearch } from "react-icons/fc"

const SearchIcon = ({ focused }) => (
  <FcSearch
    focusable="false"
    aria-hidden="true"
    sx={{
      width: t => t.space[5],
      height: t => t.space[5],
      position: `absolute`,
      left: `0.5rem`,
      top: `50%`,
      pointerEvents: `none`,
      transform: `translateY(-50%)`,
      fill: t =>
        focused ? t.colors.themedInput.iconFocus : t.colors.themedInput.icon,
    }}
  />
)

SearchIcon.propTypes = {
  overrideCSS: PropTypes.object,
}

export default SearchIcon