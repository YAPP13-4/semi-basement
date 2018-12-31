import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Navigation from './components/Navigation';
import Loading from 'src/App/components/Loading';
import Featured from './components/Featured';
import { loadMusicsInfo } from 'src/redux/music/actions';
import { loadFirstSubMusicInfo } from 'src/redux/submusic1/actions';
//TODO : FIX (with BE)
import MUSIC_URL_LIST2 from '../../constants/test/MusicUrlConstants2';
import MUSIC_URL_LIST1 from '../../constants/test/MusicUrlConstants1';
import ArtWorkContainer from '../Home/container/ArtWrokContainer';
import classnames from 'classnames/bind';
import css from './index.scss';

// 임시
import axios from 'axios';

const cx = classnames.bind(css);
const moduleName = 'Home';

class Home extends PureComponent {
  state = {
    sebaChoiceActive: false,
    knowListActive: false,
  };

  componentDidMount() {
    this.props.loadMusicsInfo(MUSIC_URL_LIST1);
    this.props.loadFirstSubMusicInfo(MUSIC_URL_LIST2);
    axios.get('http://localhost:6508/musics/seba-choice').then(res => {
      console.log(res);
      this.setState({ sebaChoice: res.data });
    });
  }

  render() {
    return !this.props.mainMusicLoading && !this.props.subMusicLoading ? (
      <div className={cx(`${moduleName}`)}>
        <Navigation />
        <div>
          <ArtWorkContainer
            category="Seba's Choice"
            musicInfos={this.props.musicInfos}
          />
        </div>
        <div>
          <ArtWorkContainer
            category="Artists you should know"
            musicInfos={this.props.subMusicInfos1}
          />
        </div>
        <div>
          <Featured />
        </div>
      </div>
    ) : (
      <Loading />
    );
  }
}

export default connect(
  ({ submusic1, music }) => {
    return {
      subMusicInfos1: submusic1.musicInfo,
      musicInfos: music.musicInfo,
      mainMusicLoading: music.loading,
      subMusicLoading: submusic1.loading,
    };
  },
  {
    loadMusicsInfo,
    loadFirstSubMusicInfo,
  },
)(Home);
