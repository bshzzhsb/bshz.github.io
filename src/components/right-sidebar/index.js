/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"

import TOCItem from "./toc-item"

const TOCContext = React.createContext({});
export function useTOCContext() {
  return React.useContext(TOCContext);
}

function RightSidebar({ TOC = {}, className }) {
  const [activeItem, setActiveItem] = React.useState();
  React.useEffect(() => {
    const TOCArr = [];
    let t = document.documentElement.scrollTop;
    const flatten = (obj) => {
      obj.items && obj.items.forEach((item) => {
        TOCArr.push(item.title);
        flatten(item);
      })
    }
    flatten(TOC)
    const handleScroll = () => {
      const top = document.documentElement.scrollTop;
      if (top > t) {
        for (let i = TOCArr.length - 1; i >= 0; i--) {
          if (document.getElementById(TOCArr[i]).offsetTop + 110 < top) {
            setActiveItem(TOCArr[i]);
            break;
          }
        }
      } else {
        for (let i = 0; i < TOCArr.length; i++) {
          if (document.getElementById(TOCArr[i]).offsetTop + 120 > top) {
            setActiveItem(TOCArr[i]);
            break;
          }
        }
      }
      t = top;
    }
    window.addEventListener("scroll", handleScroll)
    return (() => {
      window.removeEventListener("scroll", handleScroll)
    })
  }, [TOC])

  return (
    <TOCContext.Provider value={activeItem}>
      <ul
        className={className}
        sx={{
          listStyle: `none`,
        }}
      >
        {TOC.items && TOC.items.map((item) => (
          <TOCItem item={item} />
        ))}
      </ul>
    </TOCContext.Provider>
  )
}

export default RightSidebar