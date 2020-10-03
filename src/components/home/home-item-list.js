/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { FcMusic } from "react-icons/all"

import HomeItem from "./home-item"

const HomeItemList = ({ homeItems }) => (
  <React.Fragment>
    <h3>
      <FcMusic/>
      There are things about
    </h3>
    {homeItems.map(item => <HomeItem key={item.name} item={item} />)}
  </React.Fragment>
)

export default HomeItemList