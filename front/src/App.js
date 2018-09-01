import React, { Component } from 'react';
import Billy from './assets/mp3/Billy.mp3';
import Bryson from './assets/mp3/Bryson Tiller - Canceled (prod By Hunga).mp3';
import No_Rest from './assets/mp3/No Rest (Prod. by @Menohbeats).mp3';
import sheck_wes from './assets/mp3/sheck wes - mo bamba (prod. 16yrold & take a daytrip).mp3'
import Walk from './assets/mp3/Taking A Walk (Prod. Scott Storch).mp3'
import BillyThumbnail from './assets/thumbnail/Billy.jpg'
import Song from './Song'
class App extends Component {
  state = {}
  componentDidMount() {
    this._getSong();
  }
  _getSong = () => {
    const songs = [Billy,Bryson,No_Rest,sheck_wes,Walk]
    console.log(songs);
    this.setState({
      songs
    })
  }
  _renderSong = () => {
    const songs = this.state.songs.map( (mp3, index) => {
      console.log(mp3)
      return <Song thumbnail = {BillyThumbnail}
                    singer = "soyoung"
                    title = "Billy"
                    mp3 = {mp3}
              />
    })
    return songs
  }
  render() {
    return (
      <div className= "Song__Wrapper">
        {this.state.songs ? this._renderSong() : 'Loading'}
      </div>
    );
  }
}

export default App;
