import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import css from './index.scss';
import { EditForm } from './components/EditForm';
import MyChartNav from './components/MyCharNav';

const cx = classnames.bind(css);
const moduleName = 'Mypage';

class Mypage extends PureComponent {
  state = {
    toggle: false,
  };
  render() {
    console.log('this props', this.props);
    if (!this.props.userInfo) {
      return null;
    }
    const { name, snsFacebook, snsInstagram, snsTwitter } = this.props.userInfo;
    return (
      <div className={cx(`${moduleName}`)}>
        <EditForm
          isVisible={this.state.toggle}
          toggleModal={this.toggleEditForm}
        />
        <div className={cx(`${moduleName}-myinfo`)}>
          <div className={cx(`${moduleName}-myinfo-wrapper`)}>
            <div className={cx(`${moduleName}-myinfo-wrapper-img`)}>image</div>
            <div className={cx(`${moduleName}-myinfo-wrapper-name`)}>
              <div className={cx(`${moduleName}-myinfo-wrapper-name-user`)}>
                {name}
              </div>
              <div className={cx(`${moduleName}-myinfo-wrapper-desc`)}>
                Type something about you
              </div>
            </div>
            <div className={cx(`${moduleName}-myinfo-wrapper-sns`)}>
              <span />
              <span />
              <span />
              <span onClick={this.toggleEditForm}>e</span>
            </div>
          </div>
        </div>
        <div className={cx(`${moduleName}-chart`)}>
          <MyChartNav />
        </div>
      </div>
    );
  }

  toggleEditForm = () => {
    this.setState({
      toggle: !this.state.toggle,
    });
  };
}

const mapStateToProps = ({ user }) => {
  return {
    userInfo: user.userInfo,
  };
};

export default connect(mapStateToProps)(Mypage);
