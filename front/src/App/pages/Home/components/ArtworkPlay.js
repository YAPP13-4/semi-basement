import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames/bind';
import * as utils from 'src/utils';
import css from './ArtworkPlay.scss';
import IMAGE_SIZES from '../../../constants/ImageConstants';

const cx = classnames.bind(css);
const moduleName = 'ArtworkPlay';

const ArtWorkPlay = ({ musicInfo, onClickPlay }) => {
  const songId = musicInfo.id;
  const title = musicInfo.title;
  const creator = musicInfo.user.username;
  const artworkUrl = musicInfo.artwork_url;
  const duration = musicInfo.duration / 1000;

  return (
    <div className={cx(`${moduleName}`)}>
      <div className={cx(`${moduleName}-row`)}>
        <div className={cx(`${moduleName}-row__cell`)}>
          <div className={cx(`${moduleName}-song-body-card`)}>
            <div
              className={cx(`${moduleName}-song-body-card-artwork`)}
              onClick={() => {
                onClickPlay({ songId, title, creator, artworkUrl, duration });
              }}
              style={{
                backgroundImage: `url(${utils.getImageUrl(
                  artworkUrl,
                  IMAGE_SIZES.XLARGE,
                )})`,
              }}>
              <div className={cx(`${moduleName}-song-body-card-playicon`)} />
            </div>

            <Link
              className={cx(`${moduleName}-song-body-card-link`)}
              to={'/songDetail/' + songId}>
              <div className={cx(`${moduleName}-song-body-card-info`)}>
                <div className={cx(`${moduleName}-song-body-card-title`)}>
                  {title}
                </div>
                <div className={cx(`${moduleName}-song-body-card-singer`)}>
                  {creator}
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ArtWorkPlay;
