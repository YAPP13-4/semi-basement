import React, { Component } from 'react';
import { debounce, range } from 'lodash-es';
import axios from 'axios';
import classnames from 'classnames/bind';
import { unsplashImageRequest } from 'src/redux/unsplash/actions';
import { PhotoSearchForm } from './PhotoForm';
import { PhotoComponent } from './PhotoComponent';
import { USP_CLIENT_ID } from 'src/App/constants/ApiConstants';
import css from './PhotoContainer.scss';

const cx = classnames.bind(css);
const moduleName = 'PhotoContainer';
const BASE_LINE = 150;

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
    this.handleScroll = this.handleScroll.bind(this);
    this.changeSearchKeyword = debounce(
      this.changeSearchKeyword.bind(this),
      500,
    );
    this.scrollWrapper = React.createRef();
  }

  render() {
    return (
      <div
        className={cx(`${moduleName}`)}
        onScroll={this.handleScroll}
        ref={this.scrollWrapper}>
        Photos by Unsplash
        <PhotoSearchForm onChange={this.changeSearchKeyword} />
        <div className={cx(`${moduleName}-photowrapper`)}>
          {this.renderPhotoComponent()}
        </div>
      </div>
    );
  }

  handleScroll() {
    if (!this.ticking) {
      this.ticking = true;
      requestAnimationFrame(() => this.updateStatus());
    }
  }

  updateStatus = () => {
    const elm = this.scrollWrapper.current;
    const distanceToBottom =
      window.innerHeight - elm.getBoundingClientRect().bottom;
    // elm.getBoundingClientRect().bottom - (elm.scrollTop + elm.offsetHeight);
    const isTriggerPosition = distanceToBottom < BASE_LINE;

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
    return axios.get(
      `https://api.unsplash.com/search/photos?page=${targetPage}&query=${keyword}&client_id=${USP_CLIENT_ID}`,
    );
  };

  fetchUnsplashPhoto = () => {
    const { keyword, currentPage, fetchPage } = this.state;
    const fetchTargets = range(currentPage, fetchPage + 1);
    console.log(fetchTargets);

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
