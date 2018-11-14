import React, { PureComponent } from "react"
import Navigation from "../components/Navigation"
import SelectBox from "./components/SelectBox"
import SearchBar from "./components/SearchBar"
import classnames from "classnames/bind"
import css from "./ChartTabPage.scss"
import ChartTab from "./ChartTab"

const cx = classnames.bind(css)
const moduleName = "ChartTabPage"

class ChartTabPage extends PureComponent {
  state = {
    keyword: null
  }
  searchMusic = term => {
    this.setState(() => {
      return {
        keyword: term
      }
    })
  }
  render() {
    return (
      <div className={cx(`${moduleName}`)}>
        <Navigation />
        <div className={cx(`${moduleName}-option`)}>
          <SelectBox />
          <SearchBar onSearchTermCahgne={this.searchMusic} />
        </div>
        <div className={cx(`${moduleName}-chart`)}>
          <ChartTab searchKeyWord={this.state.keyword} />
        </div>
      </div>
    )
  }
}

export default ChartTabPage
