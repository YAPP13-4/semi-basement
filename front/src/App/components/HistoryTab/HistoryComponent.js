import React, { Component } from 'react'
import classnames from 'classnames/bind'
import css from './HistoryComponent.scss'
import IMAGE_SIZES from '../../constants/ImageConstants'
import getImageUrl from '../../../utils/ImageUtils'
import { selectSong } from '../../../redux/music/actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
const cx         = classnames.bind(css)
const moduleName = 'HistoryComponent'
class HistoryComponent extends Component {
    _fetchSong = () => {
        console.log('click',this.props.songId);
        this.props.selectSong(this.props.songId) // 속성 뭔지 확인해서 고치기 
    }
    render() {
        return(
            <div className={cx(`${moduleName}`)}>
                <div className={cx(`${moduleName}__artwork`)}
                    onClick={this._fetchSong}
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
function mapDispatchToProps(dispatch) {
    return bindActionCreators({selectSong} , dispatch)
}
  
export default connect(null, mapDispatchToProps)(HistoryComponent)