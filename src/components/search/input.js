/** @jsx jsx */
import { jsx } from "theme-ui"
import { connectSearchBox } from "react-instantsearch-dom"

import { Form } from "./styles"
import SearchIcon from "./search-icon"
import { themedInput } from "../../utils/styles"

export default connectSearchBox(({ refine, ...rest }) => {
  const focused = rest.focus
  return (
    <Form className="searchWrap">
      <label sx={{
          position: `relative`,
          width: [focused ? `14rem` : 24, focused ? `14rem` : 24, `100%`, focused ? `14rem` : 24, `100%`],
          transition: t =>
            `width ${t.transition.speed.default} ${t.transition.curve.default}, 
            padding ${t.transition.speed.default} ${t.transition.curve.default}`,
        }}
      >
        <input
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={e => refine(e.target.value)}
          sx={{
            ...themedInput,
            bg: [
              focused ? `themedInput.background` : `transparent`,
              focused ? `themedInput.background` : `transparent`,
              `themedInput.background`,
              focused ? `themedInput.background` : `transparent`,
              `themedInput.background`,
            ],
            pl: [7, null, null, focused ? 7 : 24, 7],
            width: [`100%`, null, null, focused ? `14rem` : 24, `100%`],
            transition: t =>
              `width ${t.transition.speed.default} ${t.transition.curve.default}, 
              padding ${t.transition.speed.default} ${t.transition.curve.default}`,
          }}
          {...rest}
        />
        <SearchIcon focused={focused} />
      </label>
    </Form>
  )
})