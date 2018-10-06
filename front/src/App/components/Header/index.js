import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import classnames from 'classnames/bind'
import logo from '../../../assets/logos/logo.png'
import css from './index.scss'

const cx = classnames.bind(css)
const moduleName = 'Header'
class Header extends Component {
  render() {
    return (
      <Fragment>  
        <header
        className={cx(`${moduleName}`)}
        style={{
          backgroundColor: this.props.pathname === '/' ? 'none' : '#000000'
        }}
      >
        <div className={cx(`${moduleName}-menu`)}>
          <span></span>
        </div>
        <div className={cx(`${moduleName}-logo`)}>
            <img src={logo} alt="logo" />
        </div>
        <div className={cx(`${moduleName}-rightSide`)}>
          <div className={cx(`${moduleName}-rightSide-user`)}>
            {/* sing up, sign in btn  a tag must be Link!!!*/}
            <a style={{marginRight:"21px"}}>Sign In</a>
            <a
              style={{backgroundColor:"#45f7aa", color:"#020202", border:"none"}}
            >Sign Up</a>
          </div>
          <div className={cx(`${moduleName}-rightSide-playlist`)}>
            <span></span>
           
          </div>
        </div>
        
      </header>

      <div> 
        {/*
        <MyPlayer open ={this.state.open}

        onMaskClick={this.onTouchEnd} /> */}
                  </div>
     
      </Fragment>

    )
  }
}

export default compose(
  connect(state => {
    const { router } = state
    return {
      pathname: router.location.pathname
    }
  })
)(Header)
