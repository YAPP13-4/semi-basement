import React, { Component } from 'react';
import axios from 'axios';
import classnames from 'classnames/bind';
import { PhotoSearchForm } from './PhotoForm';
import { PhotoComponent } from './PhotoComponent';
import { USP_CLIENT_ID } from 'src/App/constants/ApiConstants';
import css from './PhotoContainer.scss';

const cx = classnames.bind(css);
const moduleName = 'PhotoContainer';

export class PhotoContainer extends Component {
  state = {
    photoList: null,
    keyword: '',
    fetched: false,
  };
  componentDidMount() {
    this.fetchUnsplashPhoto();
  }
  render() {
    return (
      <div className={cx(`${moduleName}`)}>
        Photos by Unsplash
        <PhotoSearchForm onChange={this.changeSearchKeyword} />
        <div className={cx(`${moduleName}-photowrapper`)} >
        { this.renderPhotoComponent() }
        </div>
      </div>
    );
  }

  renderPhotoComponent = () => {
      const { photoList, fetched } = this.state

      if(!fetched) return;
      return photoList.results.map((photo,index) => (
        <PhotoComponent key={index} photo={photo} />
      ))
  }

  changeSearchKeyword = keyword => {
    this.setState(
      {
        keyword,
      },
      () => {
        this.fetchUnsplashPhoto();
      },
    );
  };

  fetchUnsplashPhoto = () => {
    const { keyword } = this.state;
    if(!keyword) return
    axios
      .get(
        `https://api.unsplash.com/search/photos?page=1&query=${keyword}&client_id=${USP_CLIENT_ID}`,
      )
      .then(res => {
        this.setState({
            photoList: res.data,
        }, () => {
            console.log('this state ', this.state.photoList)
            this.setState({
                fetched: true
            })
        });
      });
  };
}
