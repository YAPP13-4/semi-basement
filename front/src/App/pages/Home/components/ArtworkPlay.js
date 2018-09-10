import React, { Component } from 'react';
import { callApi } from '../../../../utils/ApiUtils'
import axios from 'axios';
import { resolveUrl,SONG_URL } from '../../../constants/ApiConstants'
class ArtworkPlay extends Component {
    state = {}
    constructor() {
        super();
    }
    componentDidMount() {
        this._requestId();
      }

    _requestId = () => {
        return axios.get(resolveUrl('https://soundcloud.com/matas/frost-theme-0-1'))
        .then(response => {
            this.setState({
                singerId : response.data.id
            })    
        })
        .catch(err => console.log(err))
    }
    render() {
        return(
            <div style={{color:'#ffffff'}}>
                {this.state.singerId}
            </div>
        )
    }
}
export default ArtworkPlay;
