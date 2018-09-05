import React from 'react'
import classnames from 'classnames/bind'
import css from './Landing.scss'
import landingtitle from '../../assets/landing-title.png'
const cx = classnames.bind(css)
const moduleName = 'Landing'


const Landing = () => {
    return (
        <div className={cx(`${moduleName}`)}>
           <div className={cx(`${moduleName}-logoWrapper`)}>
            <img src={landingtitle} alt="landing title"/>
            <button>GET INTO</button>
           </div>
        </div>
    )
}

export default Landing;