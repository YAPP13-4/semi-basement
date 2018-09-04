import React, { Component } from 'react'

import classnames from 'classnames/bind'

import css from './ChartTab.scss'
import ChartTabItem from './containers/ChartTabContainer'
const cx = classnames.bind(css)
const moduleName = 'ChartTab'
//ChartTab에서 state 관리해서 던지기 .. ? 
class ChartTab extends Component {
    state = {}
    //나중에 서버에서 song을 받아오면... .. state 수정해서 넣어야지 ..
    render() {
        return(
            <div className = {cx(`${moduleName}`)}>
                <div className={cx(`${moduleName}-selectTab`)}>
                    <button>  </button>
                    <select>
                        <option value="Top50">Top50</option>
                    </select>
                </div>
                <div className={cx(`${moduleName}-chart`)}>
                    <ChartTabItem/>
                </div>
            </div>
        )
    }
}

export default ChartTab;