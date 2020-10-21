/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { FcMusic } from "react-icons/all"

import HomeItem from "./home-item"

const HomeItemList = ({ homeItems }) => (
  <React.Fragment>
    <h3 sx={{my: t => t.space[4]}}>
      <FcMusic/>
      About
    </h3>
    <div
      sx={{
        overflowX: `scroll`,
        WebkitOverflowScrolling: `touch`,
        scrollbarWidth: `none`,
        mb: t => t.space[12],
        WebkitScroll: {
          display: `none`,
        },
      }}
    >
      <ul
        sx={{
          display: `flex`,
          flexDirection: `column`,
          m: 0,
          pl: t => t.space[2],
          pr: t => t.space[4],
        }}
      >
        {homeItems.map(item => <HomeItem key={item.name} item={item} />)}
      </ul>
    </div>
  </React.Fragment>
)

export default HomeItemList