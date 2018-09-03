import React, { Component } from 'react'

import classnames from 'classnames/bind'

import css from './ChartTab.scss'
import ChartTabItem from './ChartTab_item'
const cx = classnames.bind(css)
const moduleName = 'ChartTab'

class ChartTab extends Component {
    render() {
        return(
            <div classNmae = {cx(`${moduleName}`)}>
                <div className={cx(`${moduleName}-selectTab`)}>
                    <button>  </button>
                    <select>
                        <option value="Top50">Top50</option>
                    </select>
                </div>
                <div className={cx(`${moduleName}-chart`)}>
                    <ChartTabItem />
                </div>
            </div>
        )
    }
}

export default ChartTab;