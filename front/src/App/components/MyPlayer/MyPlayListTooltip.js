import React from 'react'
import Tooltip from 'src/components/Tooltip'

const MyPlayListTooltip = ({ children, handleClick }) => {
  return <div onClick={handleClick}>{children}</div>
}

export default Tooltip(MyPlayListTooltip)
