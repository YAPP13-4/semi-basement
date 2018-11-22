import React from 'react'
import Tooltip from 'src/components/Tooltip'

const MyPlayListTooltip = ({ children, handleClick }) => {

  return <div onClick={handleClick}>{children}</div>
}

const tooltipFunctions = [
  {
    name: 'add',
    icon: {
      display: 'inline-block',
      position: 'relative',
      background: ' url(src/assets/icons/icon2.png) no-repeat -280px -123px',
      height: '17px',
      width: '20px',
      top: '20px',
      left: '20px'
    },
    function: ''
  },
  {},
  {}
]

export default Tooltip(tooltipFunctions)(MyPlayListTooltip)
