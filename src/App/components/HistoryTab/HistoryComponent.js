import React, { PureComponent } from 'react';
import classnames from 'classnames/bind';
import css from './HistoryComponent.scss';
import IMAGE_SIZES from '../../constants/ImageConstants';
import * as utils from 'src/utils';
import { selectMusic } from '../../../redux/music/actions';
import { connect } from 'react-redux';
import { onPlay, onPause } from 'src/redux/player/actions';
import selectIcon from 'src/assets/icons/icon2.png';
const cx = classnames.bind(css);
const moduleName = 'HistoryComponent';

const pauseIcon = {
  background: `url(${selectIcon}) no-repeat -115px -236px`,
  width: '22px',
  height: '26px',
};
const playIcon = {
  background: `url(${selectIcon}) no-repeat -115px -320px`,
  width: '22px',
  height: '26px',
};
class HistoryComponent extends PureComponent {
  state = {
    toggle: false,
    selectMusic: false,
    iconStyle: null,
  };
  artowrkClickEvent = () => {
    this.fetchMusic();
    this.setState(prevState => {
      return {
        ...prevState,
        //historyTab의 Artwork를 반복해서 누르는 경우 css를 다르게 처리하기 위함
        selectMusic: !prevState.selectMusic,
        iconStyle: pauseIcon,
      };
    });
  };
  artowrkMouseOver = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        iconStyle: playIcon,
      };
    });
  };
  artowrkMouseOut = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        iconStyle: null,
      };
    });
  };
  fetchMusic = () => {
    const { id, title, artworkUrl, musician, duaration } = this.props;


    this.props.selectMusic({ id, title, artworkUrl, musician, duaration });
  };

  render() {
    return (
      <div className={cx(`${moduleName}`)} style={{ display: 'flex' }}>
        <div
          className={cx(`${moduleName}__artwork`)}
          onClick={this.artowrkClickEvent}
          style={{
            backgroundImage: `url(${utils.getImageUrl(
              this.props.artwork,
              IMAGE_SIZES.SMALL,
            )})`,
          }}
          onMouseOver={this.artowrkMouseOver}
          onMouseOut={this.artowrkMouseOut}>
          <div style={this.state.iconStyle ? this.state.iconStyle : null} />
        </div>
        <div>
          <div className={cx(`${moduleName}__title`)}>{this.props.title}</div>
          <div className={cx(`${moduleName}__singer`)}>{this.props.singer}</div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  {
    selectMusic,
    onPlay,
    onPause,
  },
)(HistoryComponent);
