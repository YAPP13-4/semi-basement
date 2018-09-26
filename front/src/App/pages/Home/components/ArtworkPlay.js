import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind'
import css from './ArtworkPlay.scss'
import getImageUrl from '../../../../utils/ImageUtils'
import IMAGE_SIZES from '../../../constants/ImageConstants'
import { selectSong } from '../../../../redux/music/actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
const cx = classnames.bind(css)
const moduleName = 'ArtworkPlay'

const propTypes = {
    singerName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    artwork: PropTypes.string.isRequired,
    selected : PropTypes.func,
  };
class ArtworkPlay extends Component {
    static defaultProps = {
        singerName: 'Creator',
        title: 'Title',
        artwork: 'ArtWork',
    }
    _fetchSong = () => {
        //이 부분에 배열로 담아서 store에 저장하기. 
        console.log('click',this.props.songId);
        const songInfo = [this.props.songId, this.props.title, this.props.artwork, this.props.duration]
        console.log('songinfo',songInfo)
        this.props.selectSong(songInfo)
    }
    render() {
        const artworkUrl = this.props.artwork;
        return(
            <div className={cx(`${moduleName}`)}>
                <div className={cx(`${moduleName}-row`)}>
                    <div className={cx(`${moduleName}-row__cell`)}>
                        <div className={cx(`${moduleName}-song-body-card`)}>

                            <div 
                                className={cx(`${moduleName}-song-body-card-artwork`)}
                                onClick={this._fetchSong}
                               style= {{backgroundImage: `url(${getImageUrl(artworkUrl, IMAGE_SIZES.XLARGE)})`}}
                            >
                                <div className={cx(`${moduleName}-song-body-card-playicon`)}></div>
                           </div>

                           <div className={cx(`${moduleName}-song-body-card-info`)}>
                                <div className ={cx(`${moduleName}-song-body-card-title`)}>
                                    {this.props.title}
                                </div>
                                <div className ={cx(`${moduleName}-song-body-card-singer`)}>
                                    {this.props.singerName}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
ArtworkPlay.propTypes = propTypes;
function mapDispatchToProps(dispatch) {
    return bindActionCreators({selectSong} , dispatch)
  }
  
  export default connect(null, mapDispatchToProps)(ArtworkPlay)
