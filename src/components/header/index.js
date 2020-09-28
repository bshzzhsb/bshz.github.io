/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { Link } from "gatsby"
import { DiGithubFull } from "react-icons/di"

import Search from "../search"
import config from "../../../config"

const searchIndices = [
  {
    name: `${config.header.search.indexName}`,
    title: `Results`,
    hitComp: `PostHit`
  }
]

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isActive: false }
    this.handleScroll = () => {
      if (document.documentElement.scrollTop > 100 && this.props.mdxTitle) {
        this.setState({ isActive: true })
      } else {
        this.setState({ isActive: false })
      }
    }
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll)
  }

  render() {
    const { mdxTitle, siteTitle } = this.props
    const { isActive } = this.state

    return (
      <header
        style={{
          background: `hsla(231deg, 48%, 48%, 1)`,
          height: `3.2rem`,
          width: `100%`,
          position: `fixed`,
          zIndex: 100
        }}
      >
        <div
          style={{
            margin: `0 auto`,
            padding: `0 1.5rem`,
            display: `flex`,
            position: `relative`,
            width: `100%`,
            height: `100%`,
            alignItems: `center`,
            MozBoxAlign: `center`
          }}
        >
          <h2
            style={{
              margin: 0,
              fontWeight: 500,
              fontSize: `1.25rem`,
              position: `relative`,
              display: `flex`,
              alignItems: `center`,
              flexShrink: 0,
              MozBoxAlign: `center`,
              height: `100%`
            }}
          >
            <Link
              to="/blog"
              style={{
                color: `white`,
                textDecoration: `none`
              }}
            >
              <span sx={{
                position: `relative`,
                width: `80px`,
                transform: isActive ? `translateX(-100%)` : `translateX(0)`,
                zIndex: isActive ? `-1` : `1`,
                visibility: isActive ? `hidden` : ``,
                display: `inline-block`,
                opacity: isActive ? `0` : `1`,
                transition: `transform 400ms cubic-bezier(0.1, 0.7, 0.1, 1),opacity 150ms`
              }}>{siteTitle}</span>
              <span sx={{
                position: `relative`,
                transform: isActive ? `translateX(-80px)` : `translateX(0)`,
                zIndex: isActive ? `1` : `-1`,
                display: `inline-block`,
                opacity: isActive ? `1` : `0`,
                transition: `transform 400ms cubic-bezier(0.1, 0.7, 0.1, 1),opacity 150ms`,
                pointerEvents: `none`
              }}>{mdxTitle}</span>
            </Link>
          </h2>
          <Search collapse indices={searchIndices}/>
          <a href={config.site.github} target="_blank"
             rel="noreferrer"
             sx={{
               display: `flex`,
               pl: `0.5em`,
               fontSize: `2.5em`,
               color: `currentColor`
             }}
          >
            <DiGithubFull/>
          </a>
        </div>
      </header>
    )
  }
}

export default Header
