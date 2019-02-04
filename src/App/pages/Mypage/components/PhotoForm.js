
import React from "react"
import classnames from 'classnames/bind';
import css from './PhotoForm.scss';

const cx = classnames.bind(css);
const moduleName = 'PhotoSearchForm';

export const PhotoSearchForm = (props) => {
    const { onChange } = props; 
    return (
        <div className={cx(`${moduleName}`)}>
            <input placeholder="Search Photos"  onChange={e => onChange(e.target.value)}></input>
        </div>
    )
}
