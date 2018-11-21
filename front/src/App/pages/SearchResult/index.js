import React, { PureComponent } from "react"
import { connect } from "react-redux"
import classnames from "classnames/bind"
import { loadKeywordMusic } from "src/redux/music/actions"
import NavBar from "./components/NavBar"
import ChartTab from "../Home/Chart/ChartTab"
import css from "./index.scss"

const cx = classnames.bind(css)
const moduleName = "SearchResult"

class SearchResult extends PureComponent {
  //FIX ME!
  state = {
    term: "",
    research: false, //SearchResult에서 재검색 하는지 검사할 state
    selectedResult: "All"
  }
  onInputChange = term => {
    this.setState(() => {
      return {
        term: term,
        research: true
      }
    })
  }
  handleShowResultChange = option => {
    this.setState(prevState => ({
      ...prevState,
      selectedResult: option
    }))
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.searchMusicRequest(this.state.term)
  }
  componentDidMount() {
    this.props.loadKeywordMusic(this.props.match.params.keyword)
  }
  seperateResult = (list, iteratee) => {
    let seperatedList = []

    for (let i = 0; i < list.length; i++) {
      seperatedList.push(iteratee(list[i]))
    }
    return seperatedList
  }
  filterResult = (list, predicate) => {
    let newList = []
    for (let i = 0; i < list.length; i++) {
      if (predicate(list[i])) newList.push(list[i])
    }
    return newList
  }
  isValidValue = (data, validAction, noValidACtion) => {
    return data ? validAction : noValidACtion
  }
  render() {
    const matchResult = this.props.searchResult
      ? Object.values(this.props.searchResult)
      : null

    const matchResultItem = this.isValidValue(
      matchResult,
      this.seperateResult(
        this.filterResult(matchResult, res => res.matches[0].key === "title"),
        res => res.item
      ),
      ""
    )
    console.log("matchresult item ", matchResultItem)
    const matchResultMatches = this.isValidValue(
      matchResult,
      this.seperateResult(matchResult, res => res.matches),
      ""
    )

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
                    ? this.props.searchKeyword
                    : this.state.term
                }
              />
            </div>
          </form>
        </div>
        <div className={cx(`${moduleName}-mid`)}>
          <NavBar handleShowResultChange={this.handleShowResultChange} />
        </div>
        <div className={cx(`${moduleName}-bot`)}>
          <ChartTab chartInstanceData={matchResultItem} />
        </div>
      </div>
    )
  }
}
const mapStateToProps = ({ music }) => {
  return {
    searchKeyword: music.searchKeyword,
    searchResult: music.searchResult
  }
}
export default connect(
  mapStateToProps,
  { loadKeywordMusic }
)(SearchResult)
