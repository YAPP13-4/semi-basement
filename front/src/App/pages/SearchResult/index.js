import React, { PureComponent } from "react"
import { connect } from "react-redux"
import classnames from "classnames/bind"
import Fuse from "fuse.js"
import { searchMusicRequest } from "src/redux/search/actions"
import ChartTab from "../Home/Chart/ChartTab"
import css from "./index.scss"

const cx = classnames.bind(css)
const moduleName = "SearchResult"

class SearchResult extends PureComponent {
  //FIX ME!
  state = {
    term: "",
    research: false //SearchResult에서 재검색 하는지 검사할 state
  }
  onInputChange = term => {
    this.setState(() => {
      return {
        term: term,
        research: true
      }
    })
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.searchMusicRequest(this.state.term)
  }
  search() {
    console.log("props check ", this.props.musicData)
    const searchOpts = {
      caseSensitive: true,
      shouldSort: true,
      matchAllTokens: true,
      findAllMatches: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ["title", "user.username"]
    }
    const fuse = new Fuse(this.props.musicData, searchOpts)
    const matchResult = fuse.search(this.props.searchKeyWord)
    //console.log("matchResult ", matchResult)
    return matchResult
  }
  render() {
    const matchResult = this.search()
    return !matchResult ? (
      <div>No result</div>
    ) : (
      <div className={cx(`${moduleName}`)}>
        <div className={cx(`${moduleName}-top`)}>
          <form onSubmit={this.handleSubmit}>
            <div className={cx(`${moduleName}-top-inputWrapper`)}>
              <div className={cx(`${moduleName}-top-inputWrapper-search`)}>
                Search :
              </div>
              <input
                type="text"
                onChange={event => this.onInputChange(event.target.value)}
                value={
                  !this.state.research
                    ? this.props.searchKeyWord
                    : this.state.term
                }
              />
            </div>
          </form>
        </div>
        <div className={cx(`${moduleName}-mid`)}>
          <ChartTab chartInstanceData={matchResult} />
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  const { search, music } = state
  return {
    searchKeyWord: search.searchKeyWord,
    musicData: music.musicInfo
  }
}
export default connect(
  mapStateToProps,
  { searchMusicRequest }
)(SearchResult)
