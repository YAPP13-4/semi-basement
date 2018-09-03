import React from 'react';
import css from './ChartTab_item.scss';
const chartItem = ({song, onSongSelected}) => {
    //img 받아서 thumbail 추출하기.
    return (
        <li className="list-group-item">
            <div>Title</div>
            <div>Creator</div>
            <div>-2:00</div>
            <div>icons</div>
        </li>
    )
}

export default chartItem;