import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Navigation from './components/Navigation';
import Loading from 'src/App/components/Loading';
import Featured from './components/Featured';
import { loadMusicsInfo } from 'src/redux/music/actions';
import { loadFirstSubMusicInfo } from 'src/redux/submusic1/actions';
import ArtWorkPlayContainer from '../Home/container/ArtWorkPlayContainer';
import classnames from 'classnames/bind';
import css from './index.scss';

const cx = classnames.bind(css);
const moduleName = 'Home';

class Home extends PureComponent {
  state = {
    sebaChoiceActive: false,
    knowListActive: false,
    sebaChoice: [],
  };

  componentDidMount() {
    this.props.loadMusicsInfo('seba-choice');
  }

  render() {
    return !this.props.mainMusicLoading ? (
      <div className={cx(`${moduleName}`)}>
        <Navigation />
        <div>
          <ArtWorkPlayContainer
            category="Seba's Choice"
            musicInfos={this.props.musicInfos}
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
      mainMusicLoading: music.infoLoading,
      subMusicLoading: submusic1.loading,
    };
  },
  {
    loadMusicsInfo,
    loadFirstSubMusicInfo,
  },
)(Home);
