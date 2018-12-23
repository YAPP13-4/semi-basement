import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadMusicDetail, selectMusic } from 'src/redux/music/actions';

import * as utils from 'src/utils';
import IMAGE_SIZES from 'src/App/constants/ImageConstants';
import Loading from 'src/App/components/Loading';

import classnames from 'classnames/bind';
import css from './index.scss';

const cx = classnames.bind(css);
const moduleName = 'MusicDetail';

//const { musicDetail } = this.props
class MusicDetail extends Component {
  state = {
    isOpen: false,
  };

  componentDidMount() {
    this.props.loadMusicDetail(this.props.match.params.musicId);
  }

  onClickPlay = (musicId, title, musician, artworkUrl, duration) => {
    this.props.selectMusic({
      musicId,
      title,
      musician,
      artworkUrl,
      duration,
    });
  };

  getRenderedItems(itemNumber, items) {
    if (this.state.isOpen) {
      return items;
    }
    return items.slice(0, itemNumber);
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { musicDetail } = this.props;
    if (!musicDetail) {
      return <Loading />;
    } else {
      const artworkUrl = musicDetail.artwork_url;
      const parsedDesc = utils.formatString(musicDetail.description, 5);
      return (
        <div className={cx(`${moduleName}`)}>
          <div
            style={{
              backgroundImage: `url(${utils.getImageUrl(
                artworkUrl,
                IMAGE_SIZES.XLARGE,
              )})`,
            }}
            className={cx(`${moduleName}-music`)}
          />
          <div className={cx(`${moduleName}-albumCoverWrapper`)}>
            <div
              className={cx(`${moduleName}-albumCover`)}
              style={{
                backgroundImage: `url(${utils.getImageUrl(
                  artworkUrl,
                  IMAGE_SIZES.XLARGE,
                )})`,
              }}
              /*FIX ME : refactoring */
              onClick={() => {
                this.onClickPlay(
                  musicDetail.id,
                  musicDetail.title,
                  musicDetail.user.username,
                  artworkUrl,
                  musicDetail.duration / 1000,
                );
              }}>
              <div className={cx(`${moduleName}-albumCover-playicon`)} />
            </div>
            <div className={cx(`${moduleName}-wordings`)}>
              <h3>{musicDetail.user.username}</h3>
              <h2>{musicDetail.title}</h2>
            </div>
          </div>
          <div className={cx(`${moduleName}-infoWrapper`)}>
            <div className={cx(`${moduleName}-musicInfo`)}>
              <div className={cx(`${moduleName}-musicInfo-profile`)}>
                <img
                  alt="artistProfile"
                  src={musicDetail.user.avatar_url.replace('large', 'crop')}
                />
                <div>
                  <p>Released date</p>
                  <h4>{utils.formatDdMonthYyyy(musicDetail.created_at)}</h4>
                  <h3>{musicDetail.user.username}</h3>
                </div>
              </div>
              <div className={cx(`${moduleName}-musicInfo-description`)}>
                <h4>Description</h4>
                <div
                  className={cx(`${moduleName}-musicInfo-description-inner`)}>
                  {this.getRenderedItems(2, parsedDesc).map(
                    (element, index) => {
                      return (
                        <p key={index}>
                          {element}
                          {index && index % 3 === 2 ? <br /> : ''}
                        </p>
                      );
                    },
                  )}
                  <div
                    className={cx(
                      `${moduleName}-musicInfo-description-inner-showmore`,
                    )}
                    onClick={this.toggle}>
                    <span>show more v</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx(`${moduleName}-coments`)}>COMMING SOON</div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = ({ music }) => {
  return {
    musicDetail: music.musicDetail,
  };
};

export default connect(
  mapStateToProps,
  { loadMusicDetail, selectMusic },
)(MusicDetail);
