/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"

import Sidebar from "./sidebar"

class StickyResponsiveSidebar extends React.Component {

  render() {
    return (
      <div>
        <Sidebar
          {...this.props}
        />
      </div>
    )
  }
}

export default StickyResponsiveSidebar