import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import css from './index.scss';

import TabItem from '../TabItem';

const cx = classNames.bind(css);
const moduleName = 'Tab';

class Tab extends PureComponent {
  static propTypes = {
    children: PropTypes.instanceOf(Array).isRequired,
  }

  state = {
    activeTab: this.props.children[0].props.label,
  };

  onClickTabItem = (e) => {
    this.setState({ activeTab: e.target.id });
  }

  render() {
    const { children } = this.props;

    return (
      <div className={cx(`${moduleName}`)}>
        <div className={cx(`${moduleName}-list`)}>
          <ul>
            {children.map((child) => {
              const { label } = child.props;
              return (
                <TabItem
                  activeTab={this.state.activeTab}
                  key={label}
                  label={label}
                  onClick={this.onClickTabItem}
                />
              );
            })}
          </ul>
        </div>
        <div className={cx(`${moduleName}-content`)}>
          {children.map((child) => {
            if (child.props.label !== this.state.activeTab) return undefined;
            return child.props.children;
          })}
        </div>
      </div >
    );
  }
};

export default Tab;
