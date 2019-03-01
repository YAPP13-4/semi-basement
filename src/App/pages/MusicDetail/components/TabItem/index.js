import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class TabItem extends PureComponent {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  render() {
    const { activeTab, label, onClick } = this.props;
    return (
      <li
        id={label}
        onClick={onClick}
        style={{
          borderBottom: `3px solid ${
            activeTab === label
              ? '#3498db'
              : 'transparent'
            }`
        }}>
        {label}
      </li>
    );
  }
}

export default TabItem;

