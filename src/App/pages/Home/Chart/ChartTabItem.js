import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames/bind';
import css from './ChartTabItem.scss';
import IMAGE_SIZES from '../../../constants/ImageConstants';
import * as utils from 'src/utils';
const cx = classnames.bind(css);
const moduleName = 'ChartTabContainer';

const ChartTabItem = ({ musicInfo, onClickPlay, ind }) => {
  const id = musicInfo.id;
  const title = musicInfo.title;
  const musician = musicInfo.user.username;
  const artworkUrl = musicInfo.artwork_url;
  const duration = musicInfo.duration / 1000;
  const playCount = (musicInfo.playback_count / 1000000).toFixed(2);
  const likeCount = (musicInfo.favoritings_count / 1000000).toFixed(2);
  return (
    <tr className={cx(`${moduleName}`)}>
      <td>{ind + 1} </td>
      <td
        className={cx(`${moduleName}-thumbnail`)}
        onClick={() => {
          onClickPlay({ id, title, musician, artworkUrl, duration });
        }}>
        <img
          src={`${utils.getImageUrl(artworkUrl, IMAGE_SIZES.SMALL)}`}
          alt="artwork"
        />
      </td>
      <td className={cx(`${moduleName}-title`)}>
        <Link to={'/musicDetail/' + id}>{title}</Link>
      </td>
      <td className={cx(`${moduleName}-musician`)}>{musician}</td>
      <td className={cx(`${moduleName}-time`)}>
        {utils.formatSeconds(duration)}
      </td>
      <td>
        <span className={cx(`${moduleName}-likeIcon`)} />{' '}
      </td>
      <td>{likeCount}</td>
      <td>
        <span className={cx(`${moduleName}-playIcon`)} />{' '}
      </td>
      <td>{playCount}m</td>
      <td>
        <span className={cx(`${moduleName}-addListIcon`)} />
      </td>
    </tr>
  );
};
export default ChartTabItem;
