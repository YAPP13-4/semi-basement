import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadSongDetail, selectSong } from 'src/redux/music/actions';

import * as utils from 'src/utils';
import IMAGE_SIZES from 'src/App/constants/ImageConstants';
import Loading from 'src/App/components/Loading';

import classnames from 'classnames/bind';
import css from './index.scss';

const cx = classnames.bind(css);
const moduleName = 'SongDetail';

//const { songDetail } = this.props
class SongDetail extends Component {
  state = {
    isOpen: false,
  };

  componentDidMount() {
    this.props.loadSongDetail(this.props.match.params.songId);
  }

  onClickPlay = (songId, title, singer, artworkUrl, duration) => {
    const targetMusic = {
      songId: songId,
      title: title,
      singer: singer,
      artworkUrl: artworkUrl,
      duration: duration,
    };
    this.props.selectSong(targetMusic);
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
    const { songDetail } = this.props;
    if (!songDetail) {
      return <Loading />;
    } else {
      const artworkUrl = songDetail.artwork_url;
      const parsedDesc = utils.formatString(songDetail.description, 5);
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
                  songDetail.id,
                  songDetail.title,
                  songDetail.user.username,
                  artworkUrl,
                  songDetail.duration / 1000,
                );
              }}>
              <div className={cx(`${moduleName}-albumCover-playicon`)} />
            </div>
            <div className={cx(`${moduleName}-wordings`)}>
              <h3>{songDetail.user.username}</h3>
              <h2>{songDetail.title}</h2>
            </div>
          </div>
          <div className={cx(`${moduleName}-infoWrapper`)}>
            <div className={cx(`${moduleName}-songInfo`)}>
              <div className={cx(`${moduleName}-songInfo-profile`)}>
                <img
                  alt="artistProfile"
                  src={songDetail.user.avatar_url.replace('large', 'crop')}
                />
                <div>
                  <p>Released date</p>
                  <h4>{utils.formatDdMonthYyyy(songDetail.created_at)}</h4>
                  <h3>{songDetail.user.username}</h3>
                </div>
              </div>
              <div className={cx(`${moduleName}-songInfo-description`)}>
                <h4>Description</h4>
                <div className={cx(`${moduleName}-songInfo-description-inner`)}>
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
                      `${moduleName}-songInfo-description-inner-showmore`,
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
    songDetail: music.songDetail,
  };
};
export default connect(
  mapStateToProps,
  { loadSongDetail, selectSong },
)(SongDetail);
