import React, { Component } from "react";
import Navigation from "./components/Navigation/index";
import axios from "axios";
import SONG_URL_LIST from "../../constants/test/SongUrlConstants";
import { resolveUrl } from "../../constants/ApiConstants";
import ArtworkPlay from "./components/ArtworkPlay";

import classnames from "classnames/bind";
import css from "./index.scss";
const cx = classnames.bind(css);
const moduleName = "Home";

class Home extends Component {
  state = {
    songInfos: []
  };

  componentDidMount() {
    this._requestId();
  }
  _getInfo = async () => {
    const info = await this._requestId();
  };
  _requestId = () => {
    SONG_URL_LIST.map(url => {
      return axios.get(resolveUrl(url)).then(response => {
        //console.log('resolveUrl(url)',resolveUrl(url));
        this.setState({
          songInfos: this.state.songInfos.concat(response.data)
        });
      });
    });
  };

  _rederDiscover = () => {
    const songs = this.state.songInfos.map((songInfo, index) => {
      return (
        <ArtworkPlay
          key={index}
          singerName={songInfo.user.permalink}
          duration={songInfo.duration}
          title={songInfo.title}
          artwork={songInfo.artwork_url}
          songId={songInfo.id}
        />
      );
    });
    return songs;
  };
  render() {
    return (
      <div className={cx(`${moduleName}`)}>
        <Navigation />
        <div className={cx(`${moduleName}-category`)}>
          <div />{" "}
          <div className={cx(`${moduleName}-category-title`)}>
            SEBA's Choice
          </div>
        </div>
        <div className={cx(`${moduleName}-songWrapper`)}>
          {this.state.songInfos ? this._rederDiscover() : "Loading"}
        </div>
      </div>
    );
  }
}
export default Home;
