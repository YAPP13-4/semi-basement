import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames/bind';
import css from './SignBtn.scss';
const cx = classnames.bind(css);
const moduleName = 'SingBtn';
export class SignBtn extends PureComponent {
  render() {
    return (
      <div className={cx(`${moduleName}`)}>
        <Link class={cx(`${moduleName}-signin`)} to="/sign">
          Sign In
        </Link>
        <Link class={cx(`${moduleName}-signup`)} to="/sign">
          Sign Up
        </Link>
      </div>
    );
  }
}
