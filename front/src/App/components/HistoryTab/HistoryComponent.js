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
                    style= {{backgroundImage: `url(${getImageUrl(this.props.artwork, IMAGE_SIZES.XLARGE)})`}}
                    >
                </div>
                <div>
                    <div className={cx(`${moduleName}__title`)}>{this.props.title}</div>
                    <div className={cx(`${moduleName}__singer`)}>{this.props.singer}</div>
                </div>
            </div>
        )
    }
}
export default HistoryComponent