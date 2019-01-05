import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Navigation from './components/Navigation';
import Loading from 'src/App/components/Loading';
import Featured from './components/Featured';
import { loadMusicsInfo } from 'src/redux/music/actions';
//TODO : FIX (with BE)
import MUSIC_URL_LIST1 from '../../constants/test/MusicUrlConstants1';
import ArtWorkPlayContainer from '../Home/container/ArtWorkPlayContainer';
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
    sebaChoice: [],
  };

  componentDidMount() {
    this.props.loadMusicsInfo(MUSIC_URL_LIST1);
    axios.get('http://localhost:6508/musics/seba-choice').then(res => {
      this.setState({ sebaChoice: res.data });
    });
  }

  render() {
    // return !this.props.mainMusicLoading && !this.props.subMusicLoading ? (
    return this.state.sebaChoice.length ? (
      <div className={cx(`${moduleName}`)}>
        <Navigation />
        <div>
          <ArtWorkPlayContainer
            category="Seba's Choice"
            musicInfos={this.state.sebaChoice}
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
  ({ music }) => {
    return {
      musicInfos: music.musicInfo,
      mainMusicLoading: music.loading,
    };
  },
  {
    loadMusicsInfo,
  },
)(Home);
