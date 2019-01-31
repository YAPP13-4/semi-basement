import React from 'react';
import classnames from 'classnames/bind';
import css from './PhotoComponent.scss';

const cx = classnames.bind(css);
const moduleName = 'PhotoComponent';

export const PhotoComponent = props => {
  const imgUrl  = props.photo.urls.small
  return (
    <div className={cx(`${moduleName}`)}>
      <img src={imgUrl} />
    </div>
  );
};
