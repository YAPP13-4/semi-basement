import React, { PureComponent } from "react"
import { connect } from "react-redux"
import classnames from "classnames/bind"
import { loadKeywordMusic } from "src/redux/music/actions"
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
  componentDidMount() {
    //need to test !
    this.props.loadKeywordMusic(this.props.math.params.keyword)
  }

  render() {
    const matchResult = this.props.searchResult
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
const mapStateToProps = ({ music }) => {
  return {
    searchResult: music.searchResult
  }
}
export default connect(
  mapStateToProps,
  { loadKeywordMusic }
)(SearchResult)
