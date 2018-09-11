import React, { Component, Fragment } from 'react';
import classnames from 'classnames/bind'
import css from './ArtworkPlay.scss'
import { getImageUrl } from '../../../../utils/ImageUtils'
const cx = classnames.bind(css)
const moduleName = 'ArtworkPlay'

class ArtworkPlay extends Component {
    
    render() {
        let imageUrl = this.props.artwork;
        return(
            <Fragment>
                <div >
                    SEBA's Choice
                </div>

                <div className={cx(`${moduleName}-row`)}>
                    <div className="row__cell">
                        <div className="song-body-card">
                            <div className ="song-body-card-inner">
                                <div 
                                    className="song-body-card-artwork" 
                                    style= {{backgroundImage: `url(${imageUrl})`}}
                                >
                                </div>
                                <div className ="song-body-card-title">
                                </div>
                                <div className ="song-body-card-singer">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default ArtworkPlay;
