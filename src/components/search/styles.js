/** @jsx jsx */
import { jsx } from "theme-ui"
import styled, { css } from "styled-components"
import { Search } from "@styled-icons/fa-solid/Search"
import AlgoliaIcon from "../../assets/icons/algolia-icon"

export const Root = styled.div`
  position: relative;
  display: grid;
  grid-gap: 1em;
`
export const SearchIcon = styled(Search)`
  width: 1em;
  pointer-events: none;
`
const focus = css`
  background: white;
  color: ${props => props.theme.darkBlue};
  cursor: text;
  width: 5em;
  + ${SearchIcon} {
    color: ${props => props.theme.darkBlue};
    margin: 0.3em;
  }
`
const collapse = css`
  width: 0;
  cursor: pointer;
  color: ${props => props.theme.lightBlue};
  + ${SearchIcon} {
    color: white;
  }
  ${props => props.focus && focus}
  margin-left: ${props => (props.focus ? `-1.6em` : `-1em`)};
  padding-left: ${props => (props.focus ? `1.6em` : `1em`)};
  ::placeholder {
    color: ${props => props.theme.gray};
  }
`
const expand = css`
  background: ${props => props.theme.veryLightGray};
  width: 6em;
  margin-left: -1.6em;
  padding-left: 1.6em;
  + ${SearchIcon} {
    margin: 0.3em;
  }
`
export const Input = styled.input`
  outline: none;
  border: none;
  font-size: 1em;
  background: transparent;
  transition: ${props => props.theme.shortTrans};
  border-radius: ${props => props.theme.smallBorderRadius};
  {highlight-next-line}
  ${props => (props.collapse ? collapse : expand)};
`
export const Form = styled.form`
  display: flex;
  flex-direction: row;
  position: relative;
  align-items: center;
  margin-bottom: 0;
  justify-content: flex-end;
  -moz-box-pack: end;
  align-items: flex-end;
  flex: 0 0 auto;
`
export const HitsWrapper = styled.div`
  display: ${props => (props.show ? `grid` : `none`)};
  max-height: 80vh;
  overflow: auto;
  z-index: 2;
  -webkit-overflow-scrolling: touch;
  position: absolute;
  right: 0;
  top: calc(100% + 0.5em);
  width: 80vw;
  max-width: 30em;
  box-shadow: 0 0 5px 0;
  padding: 0.7em 1em 0.4em;
  background: white;
  border-radius: ${props => props.theme.smallBorderRadius};
  li + li {
    margin-top: 0.7em;
    padding-top: 0.7em;
    border-top: 1px solid ${props => props.theme.lightGray};
  }
  * {
    margin-top: 0;
    padding: 0;
  }
  ul {
    list-style: none;
  }
  mark {
    color: ${props => props.theme.lightBlue};
    background: ${props => props.theme.darkBlue};
  }
  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.3em;
    h3 {
      color: black;
      background: ${props => props.theme.gray};
      padding: 0.1em 0.4em;
      border-radius: ${props => props.theme.smallBorderRadius};
    }
  }
  h3 {
    margin: 0 0 0.5em;
  }
  h4 {
    margin-bottom: 0.3em;
  }
`
export const PoweredBy = () => {
  return (
    <span sx={{
      fontSize: `0.8em`,
      textAlign: `end`,
      lineHeight: `30px`,
      height: `30px`,
      color: t => t.colors.text,
      borderTop: t => `2px solid ${t.colors.ui.border}`,
    }}>
      <a href="https://algolia.com" target="_blank" rel="noreferrer">
        <AlgoliaIcon size="1em" name="algolia" sx={{
          height: `24px`,
          width: `168px`,
          transform: `scale(0.8)`,
          verticalAlign: `-0.5rem`,
        }} />
      </a>
    </span>
  )
}
