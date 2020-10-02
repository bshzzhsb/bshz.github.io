/** @jsx jsx */
import { jsx } from "theme-ui"
import { connectSearchBox } from "react-instantsearch-dom"
import SearchIcon from "./Search-icon"

const Input = connectSearchBox(({ refine, ...rest }) => {
  const focused = rest.focus;
  return (
    <form
      action=""
      sx={{
        display: `flex`,
        position: `relative`,
        alignItems: `center`,
        justifyContent: `flex-end`,
        mb: 0,
        MozBoxPack: `end`,
        flex: `0 0 auto`,
      }}
    >
      <label
        htmlFor=""
        sx={{
          position: `relative`,
          width: [focused ? `14rem` : `2rem`, focused ? `14rem` : `2rem`, `100%`, focused ? `14rem` : `2rem`, `100%`],
          transition: t =>
            `width ${t.transition.speed.default} ${t.transition.curve.default},
            padding ${t.transition.speed.default} ${t.transition.curve.default}`
        }}
      >
        <input
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={e => refine(e.target.value)}
        />
        <SearchIcon focused={focused} />
      </label>
    </form>
  )
})

export default Input