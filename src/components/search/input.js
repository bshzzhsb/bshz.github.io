/** @jsx jsx */
import { jsx } from "theme-ui"
import { connectSearchBox } from "react-instantsearch-dom"

import SearchIcon from "./search-icon"
import { themedInput } from "../../utils/styles"

const debounce = (refine) => {
  let timer = null;
  return function(value) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      refine.call(this, value)
    }, 500)
  }
}

const Input = connectSearchBox(({ refine, ...rest }) => {
  const focused = rest.focus;
  const debouncedRefine = debounce(refine)

  return (
    <form
      action=""
      sx={{
        display: `flex`,
        position: `relative`,
        alignItems: `flex-end`,
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
          width: [focused ? `14rem` : `2rem`, null, null, null, null, `14rem`],
          transition: t =>
            `width ${t.transition.speed.default} ${t.transition.curve.default},
            padding ${t.transition.speed.default} ${t.transition.curve.default}`
        }}
      >
        <input
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={e => debouncedRefine(e.target.value)}
          sx={{
            ...themedInput,
            pl: `2rem`,
            width: [`100%`, null, null, focused ? `14rem` : `2rem`, `100%`],
            bg: t => t.colors.grey[5],
            transition: t =>
              `width ${t.transition.speed.default} ${t.transition.curve.default},
              padding ${t.transition.speed.default} ${t.transition.curve.default}`
          }}
          {...rest}
        />
        <SearchIcon focused={focused} />
      </label>
    </form>
  )
})

export default Input