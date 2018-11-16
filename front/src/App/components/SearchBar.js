import React, { PureComponent } from "react"
import { Redirect } from "react-router-dom"
import { connect } from "react-redux"
import classnames from "classnames/bind"
import { searchMusicRequest } from "src/redux/search/actions"
import css from "./SearchBar.scss"
const cx = classnames.bind(css)
const moduleName = "SearchBar"
class SearchBar extends PureComponent {
  state = {
    term: "",
    redir: false
  }
  onInputChange = term => {
    this.setState({ term })
  }
  handleSubmit = e => {
    e.preventDefault()
    console.log("submit", this.state.term)
    this.props.searchMusicRequest(this.state.term)

    this.setState(() => {
      return {
        term: "",
        redir: true
      }
    })
  }
  renderRedirect = () => {
    if (this.state.redir) {
      return <Redirect to="/search" />
    }
  }
  render() {
    return (
      <div className={cx(`${moduleName}`)}>
        {this.renderRedirect()}
        <form className={cx(`${moduleName}-form`)} onSubmit={this.handleSubmit}>
          <i className={cx(`${moduleName}-form-icon`)} />
          <input
            className={cx(`${moduleName}-form-input`)}
            value={this.state.term}
            onChange={event => this.onInputChange(event.target.value)}
            type="text"
          />
        </form>
      </div>
    )
  }
}
export default connect(
  null,
  { searchMusicRequest }
)(SearchBar)
