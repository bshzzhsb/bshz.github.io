/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"

import Sidebar from "./sidebar"
import { mediaQueries } from "../../utils/styles/bshz-design-tokens"

class StickyResponsiveSidebar extends React.Component {
  constructor(props) {
    super(props)
    console.log(props)
  }

  render() {
    return (
      <div
        sx={{
          borderStyle: `none solid none none`,
          borderWidth: `0 1px 0 0`,
          borderImage: `none 100% / 1 / 0 stretch`,
          borderColor: t => `${t.colors.ui.border.subtle}`,
          position: `fixed`,
          zIndex: 99,
          opacity: this.props.showSidebar ? 1 : 0,
          pointerEvents: this.props.showSidebar ? `auto` : `none`,
          height: `calc(-3.2rem + 100vh)`,
          background: `#fff`,
          transform: this.props.showSidebar ? `translateX(0)` : "translateX(-16rem)",
          boxShadow: t => t.shadows.floating,
          transition: t =>
            `transform ${t.transition.speed.default} ${t.transition.curve.default}, 
            opacity ${t.transition.speed.default} ${t.transition.curve.default}`,
          [mediaQueries.md]: {
            opacity: 1,
            top: `3.2rem`,
            pointerEvents: `auto`,
            transform: `none`,
            boxShadow: `none`,
          },
          ...this.props.overrideCSS
        }}
      >
        <div
        >
          <Sidebar
            {...this.props}
          />
        </div>
      </div>
    )
  }
}

export default StickyResponsiveSidebar