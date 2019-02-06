import React, {Component} from 'react';
import classnames from 'classnames/bind';
import {getMusicInfo, postMusic} from 'src/api'
import css from './index.scss';

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
        isAgree: false
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
        if(!this.state.isAgree) return alert('plz check the box');
        const {url, title, musician, lyrics, description, artworkImg} = this.state
        postMusic({url, title, musician, lyrics, description, artworkImg})
        console.log('서브밋!')
    }

    fetchMusicInfo = url => e => {
        getMusicInfo(url).then(({title, musician, description, artworkImg}) => {
            this.setState({title, musician, description, artworkImg})
        })
        e.preventDefault();
    }

    render() {
        return <div className={cx(`${moduleName}`)}>
            <h1>Register Song</h1>
            <div className={cx(`${moduleName}-body`)}>
                <div className={cx(`${moduleName}-inputs`)}>
                    <form onSubmit={this.handleSubmit} id="registerForm">
                        <label htmlFor="url">URL</label>
                        <input
                            id='url'
                            value={this.state.url}
                            onChange={this.handleChange}
                            onBlur={this.fetchMusicInfo(this.state.url)}
                            onKeyDown={this.handleKeyDown}
                        />

                        <label htmlFor="title">Title</label>
                        <input
                            id='title'
                            value={this.state.title}
                            onChange={this.handleChange}
                            onKeyDown={this.handleKeyDown}
                        />

                        <label htmlFor="musician">Musician</label>
                        <input
                            id='musician'
                            value={this.state.musician}
                            onChange={this.handleChange}
                            onKeyDown={this.handleKeyDown}
                        />

                        <label htmlFor="lyrics">Lyrics</label>
                        <textarea id='lyrics' value={this.state.lyrics} onChange={this.handleChange} />

                        <label htmlFor="description">Description</label>
                        <textarea id='description' value={this.state.description} onChange={this.handleChange} />

                        <input id="artworkImg" value={this.state.artworkImg} />
                    </form>
                </div>
                <div className={cx(`${moduleName}-artworkImg`)}>
                    album cover
                    <img src={this.state.artworkImg} alt='artworkImg'></img>
                    
                    <input
                        id="isAgree"
                        type="checkbox"
                        checked={this.state.isAgree}
                        onChange={this.handleChange}
                    />
                    <label htmlFor="isAgree">I agree on the responsibility of using this artwork</label>
                    
                    <button>Cancel</button>
                    <button form="registerForm">Register</button>
                </div>
            </div>
        </div>
    }
}

export default MusicRegister