import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames/bind';
import * as utils from 'src/utils';
import css from './ArtworkPlay.scss';
import IMAGE_SIZES from '../../../constants/ImageConstants';

const cx = classnames.bind(css);
const moduleName = 'ArtworkPlay';

const ArtWorkPlay = ({ musicInfo, onClickPlay }) => {
  const id = musicInfo.id;
  const title = musicInfo.title;
  const musician = musicInfo.user.username;
  const artworkUrl = musicInfo.artwork_url;
  const duration = musicInfo.duration / 1000;

  return (
    <div className={cx(`${moduleName}`)}>
      <div className={cx(`${moduleName}-row`)}>
        <div className={cx(`${moduleName}-row__cell`)}>
          <div className={cx(`${moduleName}-music-body-card`)}>
            <div
              className={cx(`${moduleName}-music-body-card-artwork`)}
              onClick={() => {
                onClickPlay({ id, title, musician, artworkUrl, duration });
              }}
              style={{
                backgroundImage: `url(${utils.getImageUrl(
                  artworkUrl,
                  IMAGE_SIZES.XLARGE,
                )})`,
              }}>
              <div className={cx(`${moduleName}-music-body-card-playicon`)} />
            </div>

            <Link
              className={cx(`${moduleName}-music-body-card-link`)}
              to={'/musicDetail/' + id}>
              <div className={cx(`${moduleName}-music-body-card-info`)}>
                <div className={cx(`${moduleName}-music-body-card-title`)}>
                  {title}
                </div>
                <div className={cx(`${moduleName}-music-body-card-musician`)}>
                  {musician}
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
