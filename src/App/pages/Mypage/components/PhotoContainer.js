import React, { Component } from 'react';
import { debounce, range, throttle } from 'lodash-es';
import classnames from 'classnames/bind';
import { unsplashImageRequest } from 'src/redux/unsplash/actions';
import { getUnsplashPhoto } from 'src/api/unsplash.js';
import { PhotoSearchForm } from './PhotoForm';
import { PhotoComponent } from './PhotoComponent';
import css from './PhotoContainer.scss';

const cx = classnames.bind(css);
const moduleName = 'PhotoContainer';
// const BASE_LINE = 80;

export class PhotoContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photoList: [],
      keyword: '',
      fetched: false,
      totalPage: 0,
      currentPage: 1,
      fetchPage: 3,
      renderTargets: [],
      count: 10,
    };
    this.handleScroll = throttle(this.handleScroll.bind(this), 500);
    this.changeSearchKeyword = debounce(
      this.changeSearchKeyword.bind(this),
      500,
    );
    this.scrollWrapper = React.createRef();
  }

  render() {
    return (
      <div className={cx(`${moduleName}`)} onScroll={this.handleScroll}>
        <h2>Photos by Unsplash</h2>
        <PhotoSearchForm onChange={this.changeSearchKeyword} />
        <div
          className={cx(`${moduleName}-photowrapper`)}
          ref={this.scrollWrapper}>
          {this.renderPhotoComponent()}
        </div>
      </div>
    );
  }

  handleScroll() {
    if (!this.ticking) {
      this.ticking = true;
      // TODO: 수정. 알고써야지... ;;; blame...
      requestAnimationFrame(() => this.updateStatus());
    }
  }

  /*
  1. distanceToBottom
  2. scroll debounce 걸기 
  3. 요청 똑같은 숫자로 감. 
  */

  updateStatus = () => {
    console.log('hi');
    console.log('elm', this.scrollWrapper);
    const elm = this.scrollWrapper.current;
    const distanceToBottom = elm.scrollHeight - elm.scrollTop;
    const isTriggerPosition = distanceToBottom < elm.clientHeight + 100;

    if (!isTriggerPosition) {
      this.ticking = false;
      return;
    }

    const { totalPage, currentPage } = this.state;

    if (totalPage > currentPage && isTriggerPosition) {
      this.setState(
        prevState => ({
          count: prevState.count + 10,
        }),
        () => {
          this.ticking = false;
          this.fetchUnsplashPhoto();
        },
      );
    }
  };

  renderPhotoComponent = () => {
    const { photoList, fetched, count } = this.state;

    if (!fetched) return;

    return photoList
      .slice(0, count)
      .map((photo, index) => (
        <PhotoComponent key={`${photo.id}_${index}`} photo={photo} />
      ));
  };

  changeSearchKeyword(keyword) {
    this.setState(
      () => ({
        keyword,
        currentPage: 1,
      }),
      () => {
        this.fetchUnsplashPhoto();
      },
    );
  }

  fetchDatas = (targetPage, keyword) =>
    unsplashImageRequest({ targetPage, keyword });

  fetchData = (targetPage, keyword) => {
    return getUnsplashPhoto({ page: targetPage, keyword });
  };

  fetchUnsplashPhoto = () => {
    const { keyword, currentPage, fetchPage } = this.state;
    const fetchTargets = range(currentPage, fetchPage + 1);

    if (!keyword) return;

    Promise.all(fetchTargets.map(index => this.fetchData(index, keyword))).then(
      results =>
        results.map(({ data }) => {
          this.setState(prevState => ({
            photoList: prevState.photoList.concat(data.results),
            totalPage: data.total_pages,
            fetched: true,
            currentPage: prevState.fetchPage,
            fetchPage: prevState.fetchPage + 1,
          }));
        }),
    );
  };
}
