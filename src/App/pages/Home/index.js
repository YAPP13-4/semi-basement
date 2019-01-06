/**
 * module imports
 */
import React, { PureComponent } from 'react';
import classnames from 'classnames/bind';
import axios from 'axios';

/**
 * src path
 */
import Loading from 'src/App/components/Loading';

/**
 * relative path
 */
import Navigation from './components/Navigation';
import Featured from './components/Featured';
import ArtWorkPlayContainer from '../Home/container/ArtWorkPlayContainer';
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
    axios.get('http://localhost:6508/musics/seba-choice').then(res => {
      this.setState({ sebaChoice: res.data });
    });
  }

  render() {
    return this.state.sebaChoice.length ? (
      <div className={cx(`${moduleName}`)}>
        <Navigation />
        <div>
          <ArtWorkPlayContainer
            category="Seba's Choice"
            apiPath="seba-choice"
            musicInfos={this.state.sebaChoice}
          />
        </div>
        <div>
          <ArtWorkPlayContainer
            category="Seba's Choice"
            apiPath="seba-choice"
            musicInfos={this.state.sebaChoice}
          />
        </div>
        <div>
          <ArtWorkPlayContainer
            category="Seba's Choice"
            apiPath="seba-choice"
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

export default Home;
