import React, { Component } from 'react'
import classnames from 'classnames/bind'
import css from './HistoryComponent.scss'
const cx         = classnames.bind(css)
const moduleName = 'HistoryComponent'
class HistoryComponent extends Component {
    render() {
        return(
            <div className={cx(`${moduleName}`)}>
                <h3> history </h3>
                <h2>{this.state.artwork_url}</h2>
                <h2>{this.state.title}</h2>
                <h2>{this.state.singer}</h2>
            </div>
        )
    }
}
export default HistoryComponent