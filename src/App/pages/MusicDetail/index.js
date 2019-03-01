import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  selectMusic,
  loadMusicDetail
} from 'src/redux/music/actions';

import classNames from 'classnames/bind';

import * as utils from 'src/utils';
import IMAGE_SIZES from 'src/App/constants/ImageConstants';
import css from './index.scss';

import Tab from './components/Tab';

const cx = classNames.bind(css);
const moduleName = 'MusicDetail';

class MusicDetail extends Component {
  componentDidMount() {
    const { musicId } = this.props.match.params;
    this.props.loadMusicDetail(musicId);
  }

  onClickPlay = e => {
    e.stopPropagation() && e.preventDefault();
    const { music } = this.props.musicDetail;
    this.props.selectMusic(music);
  }

  onClickTab = e => {
    e.stopPropagation() && e.preventDefault();
    this.setState({
      current: e.target.id,
    });
  };

  render() {
    const { music } = this.props.musicDetail;
    const tabItems = ['description', 'lylics'];
    return (
      <div className={cx(`${moduleName}`)}>
        <div className={cx(`${moduleName}-header`)}>
          <div className={cx(`${moduleName}-header-albumCover`)}
            style={{
              backgroundImage: `url(${utils.getImageUrl(
                music.artworkImg,
                IMAGE_SIZES.LARGE,
              )})`
            }}>
            <div
              className={cx(`${moduleName}-header-albumCover-playicon`)}
              onClick={this.onClickPlay}
            />
          </div>
          <div className={cx(`${moduleName}-header-albumInfo`)}>
            <span className={cx(`${moduleName}-header-albumInfo-text1`)}>
              {music.musician}
            </span>
            <div />
            <span className={cx(`${moduleName}-header-albumInfo-text2`)}>
              {music.title}
            </span>
            <div className={cx(`${moduleName}-header-albumInfo-button`)} />
          </div>
        </div>
        <div className={cx(`${moduleName}-contents`)}>
          <div className={cx(`${moduleName}-contents-left`)}>
            <div className={cx(`${moduleName}-contents-left-albumInfo`)}>
              <div className={cx(`${moduleName}-contents-left-albumInfo-profileImage`)}
                style={{
                  backgroundImage: `url(${utils.getImageUrl(
                    music.musicianImg,
                    IMAGE_SIZES.NORMAL,
                  )})`,
                }}
              />
              <div className={cx(`${moduleName}-contents-left-albumInfo-details`)}>
                <p className={cx(`${moduleName}-contents-left-albumInfo-details-text1`)}>
                  Released date
                </p>
                <p className={cx(`${moduleName}-contents-left-albumInfo-details-text2`)}>
                  {utils.dateFormat(music.created_at, 'DD MMM YYYY')}
                </p>
                <p className={cx(`${moduleName}-contents-left-albumInfo-details-text3`)}>
                  {music.musician}
                </p>
              </div>
            </div>
            <div className={cx(`${moduleName}-contents-left-tab`)}>
              <Tab children={tabItems}>
                {/* TODO 가사 줄바꿈, 가사 길이가 너비보다 긴 경우 다음 행으로 내리기 */}
                <div label="description" >
                  {music.description || '설명을 입력하세요.'}
                </div>
                <div label="lylics" >
                  {music.lylic || '가사를 입력해주세요.'}
                </div>
              </Tab>
            </div>
          </div>
          <div className={cx(`${moduleName}-contents-right`)}>
            서비스 준비중입니다.
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ music }) => {
  return {
    musicDetail: music.musicDetail,
  };
};

export default connect(
  mapStateToProps,
  {
    selectMusic,
    loadMusicDetail
  },
)(MusicDetail);

