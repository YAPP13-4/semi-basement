import React, {Component} from 'react';
import classnames from 'classnames/bind';
import {getMusicInfo} from 'src/api'
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
        albumCover: ''
    }

    handleChange = e => {
        const {id, value} = e.target
        this.setState({[id]: value})
    }
    
    handleKeyDown = e => {
        if(e.key === 'Enter') e.preventDefault()
    }

    handleSubmit = e => {
        // insert api call
        console.log('서브밋!')
        e.preventDefault()
    }

    fetchMusicInfo = url => e => {
        getMusicInfo(url).then(({title, musician, description, artworkImg}) => {
            this.setState({title, musician, description, albumCover: artworkImg})
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

                        <input id="albumCover" value={this.state.albumCover} />
                    </form>
                </div>
                <div className={cx(`${moduleName}-albumCover`)}>
                    album cover
                    <button>Cancel</button>
                    <button form="registerForm">Register</button>
                </div>
            </div>
        </div>
    }
}

export default MusicRegister