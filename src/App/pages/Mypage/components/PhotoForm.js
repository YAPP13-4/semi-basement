
import React from "react"

export const PhotoSearchForm = (props) => {
    const { onChange } = props; 
    return (
        <input onChange={e => onChange(e.target.value)}></input>
    )
}
