/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { FcMusic } from "react-icons/all"

import HomeItem from "./home-item"
import { mediaQueries } from "../../utils/styles/bshz-design-tokens"

const HomeItemList = ({ homeItems }) => (
  <React.Fragment>
    <h3>
      <FcMusic/>
      There are things about
    </h3>
    <div
      sx={{
        margin: t => `0 -${t.space[4]}`,
        overflowX: `scroll`,
        WebkitOverflowScrolling: `touch`,
        scrollbarWidth: `none`,
        WebkitScroll: {
          display: `none`,
        },
      }}
    >
      <ul
        sx={{
          display: `inline-flex`,
          p: t => `${t.space[2]} ${t.space[4]}`,
          m: 0,
          [mediaQueries.lg]: {
            flexWrap: `wrap`,
          },
        }}
      >
        {homeItems.map(item => <HomeItem key={item.name} item={item} />)}
      </ul>
    </div>
  </React.Fragment>
)

export default HomeItemList