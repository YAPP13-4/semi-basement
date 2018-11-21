import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import classnames from "classnames/bind"
import { loadKeywordMusic } from "src/redux/music/actions"
import css from "./SearchBar.scss"
const cx = classnames.bind(css)
const moduleName = "SearchBar"
class SearchBar extends PureComponent {
  state = {
    term: "",
    redir: false
  }
  handleSubmit = e => {
    e.preventDefault()
    console.log("submit", this.state.term)
    this.props.loadKeywordMusic(this.state.term)

    this.setState(() => {
      return {
        //term: "",
        redir: true
      }
    })
  }
  getTargetValue = e => {
    return this.onInputChange(e.target.value)
  }
  onInputChange = targetValue => {
    this.setState(() => ({ term: targetValue }))
  }

  renderRedirect = () => {
    if (this.state.redir) {
      return <Redirect to={"/search/" + this.state.term} />
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
            onChange={this.getTargetValue}
            type="text"
          />
        </form>
      </div>
    )
  }
}
export default connect(
  null,
  { loadKeywordMusic }
)(SearchBar)
//export default SearchBar
