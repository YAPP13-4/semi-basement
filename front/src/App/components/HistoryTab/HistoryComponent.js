import React, { Component } from 'react'
import classnames from 'classnames/bind'
import css from './HistoryComponent.scss'
import IMAGE_SIZES from '../../constants/ImageConstants'
import getImageUrl from '../../../utils/ImageUtils'
const cx         = classnames.bind(css)
const moduleName = 'HistoryComponent'
class HistoryComponent extends Component {
    render() {
        return(
            <div className={cx(`${moduleName}`)}>
                <div className={cx(`${moduleName}__artwork`)}
                    >
                
                </div>
                <div>
                    <div>title</div>
                    <div>creator</div>
                </div>
            </div>
        )
    }
}
export default HistoryComponent