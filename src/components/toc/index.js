/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import styled from "@emotion/styled"

import { ListItem } from "./item"

const Hamburger = styled(`div`)`
  --burger-menu-radius: 2.5em;
  position: relative;
  z-index: 100;
  display: block;
  width: var(--burger-menu-radius);
  height: var(--burger-menu-radius);
  border: none;
  outline: none;
  cursor: pointer;
  transition: transform 0.5s ease-in-out;
  :hover .line::after {
		transform: translateX(0);
	}
  > .line {
    position: absolute;
		left: 25%;
		width: 50%;
		height: 2px;
		background: hsla(210, 29%, 24%, 0.3);
		border-radius: 10px;
		overflow: hidden;
    transition: all 0.5s ease;
    ::after {
      position: absolute;
      content: "";
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #2980b9;
      transform: translateX(-100%);
      transition: all 0.25s ease;
    }
  }
  > .line:nth-child(1) {
    top: 30%;
  }
  > .line:nth-child(2) {
    top: 50%;
    ::after {
      transition-delay: 0.1s;
    }
  }
  > .line:nth-child(3) {
    top: 70%;
    ::after {
      transition-delay: 0.2s;
    }
  }
`

const TOC = ({ toc }) => {
  const [tocState, setTocState] = React.useState(false)

  if (toc && toc.items) {
    return (
      <div sx={{
        position: `fixed`,
        right: `1em`,
        borderRadius: tocState ? `8px` : `50%`,
        top: `5em`,
        bg: `#fff`,
        boxShadow: `0 0 0 1px rgba(35,38,59,.05),0 1px 3px 0 rgba(35,38,59,.15)`
      }}>
        <Hamburger onClick={() => {
          setTocState(!tocState)
        }} sx={{
          position: `absolute`,
          right: `8px`,
          borderRadius: `50%`,
          ":hover": {
            boxShadow: tocState ? `none` : `0 0 0 1px rgba(35,38,59,.05),0 1px 3px 0 rgba(35,38,59,.15)`
          }
        }}>
          <div className="line" sx={{
            transform: tocState ? `translateY(calc(var(--burger-menu-radius) / 5)) rotate(45deg)` : `none`
          }}/>
          <div className="line" sx={{
            transform: tocState ? `scale(0)` : `none`
          }}/>
          <div className="line" sx={{
            transform: tocState ? `translateY(calc(var(--burger-menu-radius) / -5)) rotate(-45deg)` : `none`
          }}/>
        </Hamburger>
        <ul sx={{
          width: `12rem`,
          height: `20rem`,
          overflowY: `auto`,
          scrollbarWidth: `thin`,
          opacity: tocState ? 1 : 0,
          visibility: tocState ? `visible` : `hidden`,
          display: tocState ? `block` : `none`,
          p: `4px 1em`,
          ml: 0,
          mb: 0,
          transition: `opacity ease-in-out 400ms`
        }}>
          {toc.items.map((item) => (
            <ListItem key={item.title} item={item} level={0}/>
          ))}
        </ul>
      </div>
    )
  } else {
    return (
      <div>
      </div>
    )
  }
}

export default TOC