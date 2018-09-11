import React, { Component, Fragment } from 'react';
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
  };
class ArtworkPlay extends Component {
    
    render() {
        const artworkUrl = this.props.artwork;
        return(
            <Fragment>
 
                <div className={cx(`${moduleName}-row`)}>
                    <div className={cx(`${moduleName}-row__cell`)}>
                        <div className={cx(`${moduleName}-song-body-card`)}>

                            <div 
                                className={cx(`${moduleName}-song-body-card-artwork`)}
                               style= {{backgroundImage: `url(${getImageUrl(artworkUrl, IMAGE_SIZES.XLARGE)})`}}
                            >
                           </div>
                            <div className = {cx(`${moduleName}-song-body-card-title`)}>

                            </div>
                            <div className ={cx(`${moduleName}-song-body-card-singer`)}>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
ArtworkPlay.propTypes = propTypes;
export default ArtworkPlay;
