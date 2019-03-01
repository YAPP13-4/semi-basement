import React, { PureComponent } from 'react';

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
                Name
              </div>
              <div className={cx(`${moduleName}-myinfo-wrapper-desc`)}>
                Type something about you
              </div>
            </div>
            <div className={cx(`${moduleName}-myinfo-wrapper-sns`)}>
              <span className={cx(`${moduleName}-myinfo-wrapper-sns-insta`)} />
              <span
                className={cx(`${moduleName}-myinfo-wrapper-sns-facebook`)}
              />
              <span
                className={cx(`${moduleName}-myinfo-wrapper-sns-twitter`)}
              />
              <span
                className={cx(`${moduleName}-myinfo-wrapper-sns-edit`)}
                onClick={this.toggleEditForm}
              />
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

export default Mypage;
