import React from 'react';
import PropTypes from "prop-types";

function Song({thumbnail,singer,title, mp3}) {
    return (
        <div className="Song">
            <div className="Song__thumbnail">
                <img src={thumbnail} alt={"thumbnail"}/>
            </div>
            <div className="Song__info">
                {title} {singer}
            </div>
        </div>
    )
}

export default Song;