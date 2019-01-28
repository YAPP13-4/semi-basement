import React, { Component } from "react"
import axios from 'axios'
import classnames from "classnames/bind"
import { PhotoSearchForm } from './PhotoForm'
import { USP_CLIENT_ID } from 'src/App/constants/ApiConstants'
import css from "./PhotoContainer.scss"

const cx = classnames.bind(css)
const moduleName = "PhotoContainer"

export class PhotoContainer extends Component {
    state = {
        photoList: null,
        keyword: ''
    }
    componentDidMount() {
        this.fetchUnsplashPhoto()
    }
    render() {
        return(
            <div className={cx(`${moduleName}`)}>
                Photos by Unsplash
                <PhotoSearchForm onChange={this.changeSearchKeyword} />
            </div>
        )
    }

    changeSearchKeyword = (keyword) => {
        this.setState({
            keyword 
        },
            ()=>{this.fetchUnsplashPhoto()}
        )
    }

    fetchUnsplashPhoto = () => {
        const { keyword } = this.state
        axios.get(`https://api.unsplash.com/search/photos?page=1&query=${keyword}&client_id=${USP_CLIENT_ID}`)
        .then(res => {
            this.setState({
                photoList: res.data
            })
        })
    }
}
