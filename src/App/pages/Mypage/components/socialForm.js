import React from 'react';
import classnames from "classnames/bind"
import css from "./socialForm.scss"

const cx = classnames.bind(css)
const moduleName = "SocialForm"
export const SocialEditForm = (props) => {
    const { title, placeholder } = props; 
    return(
        <div className={cx(`${moduleName}`)}>
            <h3>{title}</h3>
            <input type="text" placeholder={placeholder}></input>
        </div>
    )
}
