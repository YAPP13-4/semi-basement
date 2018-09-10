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
        this._getSongId();
      }
    _getSongId = async() => {
        const singerId = await this._reauestId();
        this.setState({
            singerId
        })
    }

    _reauestId = () => {
        return axios.get(resolveUrl('https://soundcloud.com/matas/frost-theme-0-1'))
        .then(response => {
            console.log(response)
            response.json()
        })
        .then(json => 
            console.log(json)
        )
        .catch(err => console.log(err))
    }
    render() {
        return(
            <div>
                {this.state.singerId}
            </div>
        )
    }
}
export default ArtworkPlay;
