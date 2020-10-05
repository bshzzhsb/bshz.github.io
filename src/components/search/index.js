/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import {
  InstantSearch,
  Index,
  Hits,
  connectStateResults,
} from "react-instantsearch-dom"
import algoliasearch from "algoliasearch/lite"

import Input from "./input"
import * as hitComps from "./hit-comps"
import AlgoliaIcon from "../../assets/icons/algolia-icon"

const Results = connectStateResults(
  ({ searchState: state, searchResults: res, children }) => (
    res && res.nbHits > 0 ? children : `No results for '${state.query}'😔`
  )
)

function Search({ indices, collapse, hitsAsGrid }) {
  const ref = React.useRef();
  const [query, setQuery] = React.useState("");
  const [focus, setFocus] = React.useState(false)
  const searchClient = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_SEARCH_KEY);

  const events = [`mousedown`, `touchstart`];
  const detectClickOutside = event => {
    console.log(event, ref)
    if (ref && ref.current && !ref.current.contains(event.target)) {
      console.log("false");
      setFocus(false);
    }
  }
  React.useEffect(() => {
    for (const event of events) {
      document.addEventListener(event, detectClickOutside, false)
    }
    return () => {
      for (const event of events) {
        document.removeEventListener(event, detectClickOutside)
      }
    }
  })

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={indices[0].name}
      onSearchStateChange={({ query }) => setQuery(query)}
    >
      <div
        ref={ref}
        sx={{
          display: `flex`,
          position: `relative`,
          mx: t => t.space[4],
        }}
      >
        <Input
          onFocus={() => setFocus(true)}
          {...{ collapse, focus }}
        />
        <div
          sx={{
            display: focus && query && query.length > 0 ? `grid` : `none`,
            maxHeight: `80vh`,
            overflow: `auto`,
            zIndex: 2,
            WebkitOverflowScrolling: `touch`,
            position: `absolute`,
            right: 0,
            top: `calc(100% + 0.5rem)`,
            width: `80vw`,
            maxWidth: `30rem`,
            boxShadow: `0 0 5px 0`,
            p: `0.7rem  1rem 0.4rem`,
            bg: t => t.colors.white,
            borderRadius: `4px`,
          }}
        >
          {indices.map(({ name, title, hitComp}) => (
            <Index key={name} indexName={name}>
              <Results>
                <Hits hitComponent={hitComps[hitComp](() => setFocus(false))} />
              </Results>
            </Index>
          ))}
          <span
            sx={{
              fontSize: `0.8em`,
              textAlign: `end`,
              lineHeight: `30px`,
              height: `30px`,
              color: t => t.colors.text,
              borderTop: t => `2px solid ${t.colors.ui.border}`,
            }}
          >
            <a href="https://algolia.com" target="_blank" rel="noreferrer">
              <AlgoliaIcon
                size="1rem"
                name="algolia"
                sx={{
                  height: `24px`,
                  width: `168px`,
                  transform: `scale(0.8)`,
                  verticalAlign: `-0.5rem`,
                }}
              />
            </a>
          </span>
        </div>
      </div>
    </InstantSearch>
  )
}

export default Search