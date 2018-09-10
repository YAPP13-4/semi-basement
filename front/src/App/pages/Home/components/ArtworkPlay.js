import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind'
import css from './ArtworkPlay.scss'

const cx = classnames.bind(css)
const moduleName = 'ArtworkPlay'


class ArtworkPlay extends Component {
    render() {
        return(
            <Fragment>
                <div >
                    SEBA's Choice
                </div>

                <div className="row">
                    <div className="row__cell">
                        <div className="song-body-card">
                            <div className ="song-body-card-inner">
                                <div 
                                    className="song-body-card-artwork"
                                    style= {{backgroundImage: this.props.artwork}}
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
