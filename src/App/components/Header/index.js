import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { SignBtn } from './Component/SignBtn';
import classnames from 'classnames/bind';
import { toggleMyplayer, toggleGNB } from 'src/redux/meta/actions.js';
import logo from 'src/assets/logos/logo.svg';
import css from './index.scss';

const cx = classnames.bind(css);
const moduleName = 'Header';
class Header extends Component {
  render() {
    return (
      <div
        className={cx(`${moduleName}`)}
        style={{
          backgroundColor: this.props.pathname === '/' ? 'none' : '#000000',
        }}>
        <header className={cx(`${moduleName}-inner`)}>
          <div className={cx(`${moduleName}-menu`)}>
            <span onClick={this.props.toggleGNB} />
          </div>
          <div className={cx(`${moduleName}-logo`)}>
            <Link to="/main">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <div className={cx(`${moduleName}-rightSide`)}>
            <SignBtn />
            <div
              className={cx(`${moduleName}-rightSide-playlist`)}
              onClick={this.props.toggleMyplayer}>
              <span />
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default compose(
  connect(
    state => {
      const { router } = state;
      return {
        pathname: router.location.pathname,
      };
    },
    {
      toggleMyplayer,
      toggleGNB,
    },
  ),
)(Header);
