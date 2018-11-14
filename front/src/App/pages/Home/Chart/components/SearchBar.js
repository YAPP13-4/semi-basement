import React, { PureComponent } from "react"

class SearchBar extends PureComponent {
  state = {
    term: ""
  }
  onInputChange = term => {
    this.setState({ term })
    this.props.onSearchTermCahgne(term)
  }
  render() {
    return (
      <div>
        <input
          value={this.state.term}
          onChange={event => this.onInputChange(event.target.value)}
          type="text"
        />
      </div>
    )
  }
}
export default SearchBar
