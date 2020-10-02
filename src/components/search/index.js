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

const clickOutSide = (ref, handler, events) => {
  if (!events) {
    events = [`mousedown`, `touchstart`];
  }
  const detectClickOutside = event => {
    ref && ref.current && !ref.current.contains(events.target) && handler()
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
}

function Search({ indices, collapse, hitsAsGrid }) {
  const ref = React.createRef();
  const [query, setQuery] = React.useState("");
  const [focus, setFocus] = React.useState(false)

  clickOutSide(ref, () => setFocus(false))
  const searchClient = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_SEARCH_KEY);

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={indices[0].name}
      onSearchStateChange={({ query }) => setQuery(query)}
    >
      <div
        sx={{
          display: `flex`,
          position: `relative`,
          mb: 0,
          ml: `auto`,
        }}
      >
        <Input
          onFocus={() => setFocus(true)}
          {...{ collapse, focus }}
        />
        <div
          sx={{
            display: focus && query.length > 0 ? `grid` : `none`,
            overflow: `auto`,
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