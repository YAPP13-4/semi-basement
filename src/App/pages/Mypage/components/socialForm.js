import React from 'react';

export const SocialEditForm = (props) => {
    console.log('props ? ',props)
    const { title, placeholder } = props; 
    return(
        <div>
            <h3>{title}</h3>
            <input type="text" placeholder={placeholder}></input>
        </div>
    )
}
