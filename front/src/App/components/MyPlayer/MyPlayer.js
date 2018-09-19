import React, { Component } from 'react'
import classnames from 'classnames/bind'
import css from './MyPlayer.scss'
import {connect} from 'react-redux' 
const cx = classnames.bind(css)
const moduleName = 'MyPlayer'

class MyPlayer extends Component {
    state={
        heardSong:''
    }
    componentDidMount() {
        const heardSong = localStorage.heardSong

        if(heardSong) {
            this.setState({
                heardSong : heardSong
            })
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevState.heardSong != this.state.heardSong) {
            localStorage.heardSong = this.state.heardSong
        }
    }

    render() {
        return(
            <div>
                <h1 style={{color:"#ffffff"}}>
                    {this.state.heardSong}
                </h1>
            </div>
        )
    }
}
function mapStateToProps({heardSong}) {
    const myHeardSong = heardSong
    return { heardSong : myHeardSong}
  } 
export default connect(mapStateToProps)(MyPlayer)