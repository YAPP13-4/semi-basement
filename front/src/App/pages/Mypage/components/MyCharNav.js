import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames/bind';
import css from './MyChartNav.scss';

const cx = classnames.bind(css);
const moduleName = 'MyChartNav';

class MyChartNav extends PureComponent {
  state = {
    selected: 'playlist',
  };
  selectedTab = info => {
    if (info !== this.state.selected) {
      this.setState(() => {
        return {
          selected: info,
        };
      });
    }
  };

  render() {
    const paintingCurrentStyle = path => {
      if (this.state.selected === path) return underStyle;
    };
    const underStyle = {
      borderBottom: '2px solid #45f7aa',
    };
    return (
      <div className={cx(`${moduleName}`)}>
        <div className={cx(`${moduleName}-left`)}>
          <div
            onClick={() => {
              this.selectedTab('albums');
            }}
            style={paintingCurrentStyle('albums')}>
            Albums
          </div>
          <div
            onClick={() => {
              this.selectedTab('playlist');
            }}
            style={paintingCurrentStyle('playlist')}>
            Playlist
          </div>
          <div
            onClick={() => {
              this.selectedTab('liked');
            }}
            style={paintingCurrentStyle('liked')}>
            liked
          </div>
          <div>
            <Link to="/regSong"> AddTrack </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default MyChartNav;
