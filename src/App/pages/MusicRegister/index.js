import React, {Component} from 'react';
import classnames from 'classnames/bind';
import css from './index.scss';

const cx = classnames.bind(css);
const moduleName = 'MusicRegister';
class MusicRegister extends Component {
    
    state = {
        url:'',
        title: '',
        musician: '',
        lyrics: '',
        description: '',
        albumCover: ''
    }
    
    handleChange = (e) => {
        const {name, value} = e.target
        this.setState({[name]: value})
    }
    
    
    render() {
        return <div className={cx(`${moduleName}`)}>
            <h1>Register Song</h1>
            <div className={cx(`${moduleName}-body`)}>
                <div className={cx(`${moduleName}-inputs`)}>
                    <form>
                        <label>
                            URL
                            <input name='url' value={this.state.url} onChange={this.handleChange} />
                        </label>
                        <label>
                            Title
                            <input name='title' value={this.state.title} onChange={this.handleChange}/>
                        </label>
                        <label>
                            Musician
                            <input name='musician' value={this.state.musician} onChange={this.handleChange}/>
                        </label>
                        <label>
                            Lyrics
                            <textarea name='lyrics' value={this.state.lyrics} onChange={this.handleChange}/>
                        </label>
                        <label>
                            Description
                            <textarea name='description' value={this.state.description} onChange={this.handleChange}/>
                        </label>
                        <input name="albumCover" value={this.state.albumCover}/>
                    </form>
                </div>
                <div className={cx(`${moduleName}-albumCover`)}>
                    album cover
                </div>
            </div>
        </div>
    }
}

export default MusicRegister