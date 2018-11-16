import React, { PureComponent } from "react"
import { Redirect } from "react-router-dom"
import { connect } from "react-redux"
import { searchMusicRequest } from "src/redux/search/actions"
class SearchBar extends PureComponent {
  state = {
    term: "",
    redir: false
  }
  onInputChange = term => {
    this.setState({ term })
    //this.props.onSearchTermCahgne(term)
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
    //return <Redirect to="/search" />
  }
  renderRedirect = () => {
    if (this.state.redir) {
      return <Redirect to="/search" />
    }
  }
  render() {
    return (
      <div>
        {this.renderRedirect()}
        <form onSubmit={this.handleSubmit}>
          <input
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
