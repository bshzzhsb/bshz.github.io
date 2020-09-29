/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"

const SidebarContext = React.createContext({})
export function useSidebarContext() {
  return React.useContext(SidebarContext)
}

function Sidebar({ title, location, itemList }) {
  const scrollRef = React.useRef(null)
  // TODO
  const context = React.useMemo(() => {
    return {}
  }, [])

  return (
    <SidebarContext.Provider value={context}>
      <section>
        <nav
          ref={scrollRef}
          sx={{
            display: `block`,
          }}
        >
          <h3
            sx={{
              px: `6rem`,
            }}
          >
            { title }
          </h3>
          <ul>
            { JSON.stringify(itemList) }
          </ul>
        </nav>
      </section>
    </SidebarContext.Provider>
  )
}

export default Sidebar