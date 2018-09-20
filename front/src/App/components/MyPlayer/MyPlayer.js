import React, { Component } from 'react'
import classnames from 'classnames/bind'
import css from './MyPlayer.scss'
import {connect} from 'react-redux' 
import Drawer from 'rc-drawer';
const cx = classnames.bind(css)
const moduleName = 'MyPlayer'

class MyPlayer extends Component {
    state = {
        open: true,
      }
      componentDidMount() {
        setTimeout(() => {
          this.setState({
            open: false,
          });
        }, 2000);
      }
      onChange = (bool) => {
        console.log(bool);
      }
      onTouchEnd = () => {
        this.setState({
          open: false,
        });
      }
      onSwitch = () => {
        this.setState({
          open: !this.state.open,
        });
      }
/*
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
*/
    render() {
        return(
            <div>
        <Drawer
          onChange={this.onChange}
          open={this.state.open}
          onMaskClick={this.onTouchEnd}
          handler={false}
          level={null}
          width="20vw"
        >
           <div style={{backgroundColor:"#ffffff"}}> dfdsfs ss ds </div> 
        </Drawer>
        <div
          style={{
            width: '100%', height: 667, background: '#fff000',
            color: '#fff', textAlign: 'center', lineHeight: '667px',
          }}
        >
          内容区块
          <button
            onClick={this.onSwitch}
            style={{ height: 24, width: 100, marginLeft: 20, color: '#000', lineHeight: '24px' }}
          >
            {!this.state.open ? '打开' : '关闭'}
          </button>
        </div> 
            </div>
        )
    }
}
/*
function mapStateToProps({heardSong}) {
    const myHeardSong = heardSong
    return { heardSong : myHeardSong}
  } */
//export default connect(mapStateToProps)(MyPlayer)
export default MyPlayer