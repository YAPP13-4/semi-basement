import React, { PureComponent } from 'react';
import logo from 'src/assets/logos/logo.png';
import classnames from 'classnames/bind';
import css from './index.scss';

const cx = classnames.bind(css);
const moduleName = 'SignUp';

class SignUp extends PureComponent {
  signUpFacebook = () => {
    window.location.href = 'https://seba-api.cf/auth/facebook';
  };

  render() {
    return (
      <div className={cx(`${moduleName}`)}>
        <div className={cx(`${moduleName}_wrapper`)}>
          <div className={cx(`${moduleName}_wrapper_logo`)}>
            <img src={logo} alt={logo} />
          </div>
          <div className={cx(`${moduleName}_wrapper_content`)}>
            <div className={cx(`${moduleName}_wrapper_content_top`)}>
              Start Semibasement
            </div>
            <div className={cx(`${moduleName}_wrapper_content_body`)}>
              복잡한 절차 없이 SNS계정으로간편하게 <br />
              세미베이스먼트를 만나보세요!
            </div>
            <div className={cx(`${moduleName}_wrapper_content_bottom`)}>
              <span
                className={cx(`${moduleName}_wrapper_content_bottom_icon`)}
              />
              <div
                className={cx(`${moduleName}_wrapper_content_bottom_title`)}
                onClick={this.signUpFacebook}>
                Continue With Facebook
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
