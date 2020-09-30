/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"

import Sidebar from "./sidebar"
import { mediaQueries } from "../../utils/styles/bshz-design-tokens"

class StickyResponsiveSidebar extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)
  }

  render() {
    return (
      <div
        sx={{
          borderStyle: `none solid none none`,
          borderWidth: `0 1px 0 0`,
          borderImage: `none 100% / 1 / 0 stretch`,
          borderColor: t => `${t.colors.ui.border}`,
          position: `fixed`,
          opacity: 0,
          pointerEvents: `none`,
          height: `calc(-3.2rem + 100vh)`,
          [mediaQueries.md]: {
            opacity: 1,
            top: `3.2rem`,
            pointerEvents: `auto`,
          },
          ...this.props.overrideCSS,
        }}
      >
        <Sidebar
          {...this.props}
        />
      </div>
    )
  }
}

export default StickyResponsiveSidebar