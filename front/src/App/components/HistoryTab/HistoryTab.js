import React, { Component } from 'react'
import './HistoryTab.css'
import { connect } from 'react-redux'
class HistoryTab extends Component {
    constructor(props){
        super(props);
        console.log('myplayer')
    }
    /*
    onChange = (bool) => {

        console.log('onchange',bool);
      }
*/
    render() {
        return(
            <div>
                {this.props.historySong}
            </div>
            /*
        <Drawer
          onChange={this.onChange}
          open={this.props.open}
          onMaskClick={this.props.onMaskClick}
          handler={false}
          level={null}
          width="20vw"
          placement="left"
          className="drawr-player"
        >

        </Drawer>*/
        )
    }
}
function mapStateToProps(state) {
    console.log('Myplayer state to props :',state);

    localStorage.historyData = JSON.stringify(state.music.historySong)

    const historyData = localStorage.historyData

    console.log('local Storage ', JSON.parse(historyData))
    
    return { historySong : state.music.historySong}
} 

export default connect(mapStateToProps)(HistoryTab)
//export default MyPlayer