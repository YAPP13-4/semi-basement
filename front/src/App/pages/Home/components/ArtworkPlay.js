import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind'
import css from './ArtworkPlay.scss'
import getImageUrl from '../../../../utils/ImageUtils'
import IMAGE_SIZES from '../../../constants/ImageConstants'
const cx = classnames.bind(css)
const moduleName = 'ArtworkPlay'

const propTypes = {
    singerName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    artwork: PropTypes.string.isRequired,
    selected : PropTypes.func.isRequired,
  };
class ArtworkPlay extends Component {
    static defaultProps = {
        singerName: 'PropTypes.string.isRequired',
        title: 'PropTypes.string.isRequired',
        artwork: 'PropTypes.string.isRequired',
        selected : ()=> {console.log('err')},
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
                                onClick={this.props.selected}
                               style= {{backgroundImage: `url(${getImageUrl(artworkUrl, IMAGE_SIZES.XLARGE)})`}}
                            >
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
export default ArtworkPlay;
