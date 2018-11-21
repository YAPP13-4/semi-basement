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
    console.log("this.props.match : ", this.props.match)
    this.props.loadKeywordMusic(this.props.match.params.keyword)
  }
  seperateResult = (list, iteratee) => {
    let seperatedList = []
    if (list) {
      console.log("list ", list, "list[0].item ", list[0].item)
      console.log("iteratee[list[i]] ", iteratee(list[0]))
      for (let i = 0; i < list.length; i++) {
        seperatedList.push(iteratee(list[i]))
      }
      console.log("seperatedList  ", seperatedList)
      return seperatedList
    }
    return null
  }
  //FIX ME : 왜 안되는거지 ..ㅠㅠㅠ
  /*
      const matchResultItem = this.isValidValue(
      matchResult,
      this.seperateResult(matchResult, res => res.item),
      ""
    )
  */

  isValidValue = (data, validAction, noValidACtion) => {
    console.log("data", data)
    return data ? validAction : noValidACtion
  }
  render() {
    const matchResult = this.props.searchResult
      ? Object.values(this.props.searchResult)
      : null

    const matchResultItem = this.props.searchResult
      ? this.seperateResult(matchResult, res => res.item)
      : null

    const matchResultMatches = this.isValidValue(
      matchResult,
      this.seperateResult(matchResult, res => res.matches),
      ""
    )
    /*
    const matchResultMatches = matchResult
      ? matchResult.map(result => {
          return result.matches
        })
      : null*/
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
          <ChartTab chartInstanceData={matchResultItem} />
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
