import React, { PureComponent } from "react"
import { connect } from "react-redux"
import classnames from "classnames/bind"
import Fuse from "fuse.js"
import css from "./index.scss"

const cx = classnames.bind(css)
const moduleName = "SearchResult"

class SearchResult extends PureComponent {
  //FIX ME!
  componentDidCatch() {}
  search() {
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
    return matchResult
  }
  render() {
    const matchResult = this.search()
    return (
      <div className={cx(`${moduleName}`)}>
        <div>{matchResult}</div>
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
export default connect(mapStateToProps)(SearchResult)
