import React, { Component } from 'react'
import classnames from 'classnames/bind'
import css from './HistoryTabComponent.scss'
const cx         = classnames.bind(css)
const moduleName = 'ChartTab'
class HistoryComponent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className={cx(`${moduleName}`)}>
                
            </div>
        )
    }
}
export default HistoryComponent