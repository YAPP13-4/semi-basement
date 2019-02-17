import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classnames from 'classnames/bind';
import {postMusic} from 'src/api'
import {loadSoundcloudMusicInfo, resetRegistMusicState} from 'src/redux/register/actions'
import css from './index.scss';
import test1 from 'src/assets/default_cover/cover1-1.png';
import test2 from 'src/assets/default_cover/cover1-2.png';
import test3 from 'src/assets/default_cover/cover1-3.png';
import test4 from 'src/assets/default_cover/cover1-4.png';
import test5 from 'src/assets/default_cover/cover1-5.png';


const cx = classnames.bind(css);
const moduleName = 'MusicRegister';
class MusicRegister extends Component {

  state = {
    url: '',
    title: '',
    musician: '',
    lyrics: '',
    description: '',
    artworkImg: '',
    selectedArtworkImg: '',
    isAgree: false
  }

  static getDerivedStateFromProps(props) {
    const {
      registMusic: {
        title,
        musician,
        description,
        artworkImg
      },
      registMusicState: {fulfilled},
      resetRegistMusicState
    } = props;
    if (fulfilled) {
      resetRegistMusicState();
      return {
        title,
        musician,
        description,
        artworkImg,
        selectedArtworkImg: artworkImg
      }
    }
    return null;
  }

  handleChange = e => {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const id = target.id

    this.setState({[id]: value})
  }

  handleKeyDown = e => {
    if (e.key === 'Enter') e.preventDefault()
  }

  handleSubmit = e => {
    e.preventDefault()
    if (!this.state.isAgree) return alert('plz check the box');
    const {url, title, musician, lyrics, description, artworkImg} = this.state
    postMusic({url, title, musician, lyrics, description, artworkImg});
  }

  fetchMusicInfo = url => e => {
    if (!url) return
    this.props.loadSoundcloudMusicInfo(url);
    e.preventDefault();
  }

  renderMainArtWorkImg = () => {
    return this.state.selectedArtworkImg
      ? <img className={cx(`${moduleName}-albumCover-mainImg`)} src={this.state.selectedArtworkImg} alt='artworkImg' />
      : <div className={cx(`${moduleName}-albumCover-mainImg`)}>
        <span className={cx(`${moduleName}-albumCover-defaultLogo`)} />
        <div className={cx(`${moduleName}-albumCover-explain`)}>
          <p className={cx(`${moduleName}-albumCover-explain-bold`)}>Bring album cover from SoundCloud.</p>
          <p className={cx(`${moduleName}-albumCover-explain-text`)}>
            * if you having trouble whit using artwork.<br />
            feel free to use our open license artwork<br />
            there is no responsibility and copyright
                    </p>
        </div>
      </div>
  }

  renderArtWorkImgs = imgs => {
    return imgs.map((img, i) => (
      <div key={i}>
        {img
          ? <img
            onClick={() => {this.setState({selectedArtworkImg: img})}}
            src={img}
            alt="artwork"
          />
          : <div
            className={cx(`${moduleName}-albumCover-imgs-soundCloudLogo`)}
            onClick={() => {this.setState({selectedArtworkImg: ""})}}
          >
            <i />
          </div>}
      </div>
    ))
  }

  render() {
    return <div className={cx(`${moduleName}`)}>
      <h1>Register Song</h1>
      <div className={cx(`${moduleName}-body`)}>
        <form
          className={cx(`${moduleName}-form`)}
          onSubmit={this.handleSubmit} id="registerForm"
        >
          <label htmlFor="url">URL</label>
          <input
            id='url'
            value={this.state.url}
            placeholder='https://'
            onChange={this.handleChange}
            onBlur={this.fetchMusicInfo(this.state.url)}
            onKeyDown={this.handleKeyDown}
          />

          <label htmlFor="title">Title</label>
          <input
            id='title'
            value={this.state.title}
            placeholder='this is title'
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
          />

          <label htmlFor="musician">Musician</label>
          <input
            id='musician'
            value={this.state.musician}
            placeholder='xxxtentacion'
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
          />

          <label htmlFor="lyrics">Lyrics</label>
          <textarea
            id='lyrics'
            value={this.state.lyrics}
            placeholder='here comes text'
            onChange={this.handleChange}
          />

          <label htmlFor="description">Description</label>
          <textarea
            id='description'
            value={this.state.description}
            placeholder='here comes text'
            onChange={this.handleChange}
          />

          <input id="artworkImg" value={this.state.selectedArtworkImg} />
        </form>
        <div className={cx(`${moduleName}-albumCover`)}>
          <h5>Album cover</h5>
          {this.renderMainArtWorkImg()}
          <div className={cx(`${moduleName}-albumCover-imgs`)}>
            {this.renderArtWorkImgs([this.state.artworkImg, test1, test2, test3, test4, test5])}
          </div>

          <div className={cx(`${moduleName}-albumCover-checkBox`)}>
            <input
              id="isAgree"
              type="checkbox"
              checked={this.state.isAgree}
              onChange={this.handleChange}
            />
            <label htmlFor="isAgree">I agree on the responsibility of using this artwork</label>
          </div>

          <div className={cx(`${moduleName}-albumCover-buttons`)}>
            <button>Cancel</button>
            <button form="registerForm">Register</button>
          </div>
        </div>
      </div>
    </div>
  }
}

MusicRegister.propTypes = {
  registMusic: PropTypes.object,
  registMusicState: PropTypes.object,
  loadSoundcloudMusicInfo: PropTypes.func,
  resetRegistMusicState: PropTypes.func
}

const mapStateToProps = ({
  register: {registMusic, registMusicState},
}) => ({registMusic, registMusicState});
const mapDispatchToProps = {
  loadSoundcloudMusicInfo,
  resetRegistMusicState
};

export default connect(mapStateToProps, mapDispatchToProps)(MusicRegister);