import React, { Component } from 'react';
import { debounce } from 'lodash-es'
import axios from 'axios';
import classnames from 'classnames/bind';
import { PhotoSearchForm } from './PhotoForm';
import { PhotoComponent } from './PhotoComponent';
import { USP_CLIENT_ID } from 'src/App/constants/ApiConstants';
import css from './PhotoContainer.scss';

const cx = classnames.bind(css);
const moduleName = 'PhotoContainer';
const BASE_LINE = 50

export class PhotoContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photoList: [],
      keyword: '',
      fetched: false,
      totalPage: 0,
      currentPage: 1
    }

    this.handleScroll = debounce(this.handleScroll.bind(this),1000);
  }

  render() {
    return (
      <div className={cx(`${moduleName}`)} onScroll={this.handleScroll}>
        Photos by Unsplash
          <PhotoSearchForm onChange={this.changeSearchKeyword} />
        <div className={cx(`${moduleName}-photowrapper`)} >
        { this.renderPhotoComponent() }
        </div>
      </div>
    );
  }
  
  handleScroll() {
    // console.log('scroll event')
    if (!this.ticking) {
      this.ticking = true
      requestAnimationFrame(() => this.updateStatus())
    }
  }

  updateStatus = () => {
    const distanceToBottom =
      document.documentElement.offsetHeight -
      (window.scrollY + window.innerHeight)
    
    const isTriggerPosition = distanceToBottom < BASE_LINE
    console.log('distanceToBottom',distanceToBottom,'isTriggerPosition',isTriggerPosition)
    if (!isTriggerPosition) {
      this.ticking = false
      return
    }

    const { totalPage, currentPage } = this.state
    
    if(totalPage > currentPage && isTriggerPosition) {
      this.setState((prevState) => ({
        currentPage : prevState.currentPage + 1
      }), () => {
        this.ticking = false;
        this.fetchUnsplashPhoto()
      })
    } 
  }

  renderPhotoComponent = () => {
      const { photoList, fetched } = this.state
    console.log('photoList',photoList)
      if(!fetched || !photoList) return;

      return photoList.map((photo,index) => (
         photo.results.map( (item) => (
           <PhotoComponent key={item.id} photo={item} />
        ))
      ))
  }

  changeSearchKeyword = keyword => {
    this.setState(() => ({
      keyword,
      currentPage : 1
    }),
      () => {
        this.fetchUnsplashPhoto();
      },
    );
  };

  fetchUnsplashPhoto = () => {
    const { keyword, currentPage } = this.state;

    if(!keyword) return
    axios
      .get(
        `https://api.unsplash.com/search/photos?page=${currentPage}&query=${keyword}&client_id=${USP_CLIENT_ID}`,
      )
      .then(res => {
        this.setState((prevState) => ({
            photoList: [...prevState.photoList, res.data],
        }), () => {
            console.log('this state ', this.state.photoList)
            this.setState((prevState) => {
              return {
                fetched: true,
                totalPage : this.state.photoList[this.state.photoList.length -1].total_pages
              }
            })
        });
      });
  };
}
