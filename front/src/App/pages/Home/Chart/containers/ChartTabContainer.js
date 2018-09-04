import React ,{Component} from 'react'
import classnames from 'classnames/bind'
import css from './ChartTabContainer.scss';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { selectSong } from '../../../../../actions/index'
const cx = classnames.bind(css)
const moduleName = 'ChartTabContainer'

class chartItem extends Component{
    constructor(props) {
        super(props)

        this.state = { term : ''}
        this._onSongSelected = this._onSongSelected.bind(this);
    }
    _onSongSelected(event) {
        console.log(event.target.id);
        this.setState({
            term : event.target.id
        });
        this.props.selectSong(this.state.term)
    }
    render() {
        return (
            <li className={cx(`${moduleName}`)}>
                <div onClick={this._onSongSelected} id="https://soundcloud.com/uiceheidd/lucid-dreams-forget-me">Lucid Dreams</div>
                <div>Creator</div>
                <div>-2:00</div>
                <div>icons</div>
            </li>
        )
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({selectSong} , dispatch)
}
export default connect(null, mapDispatchToProps)(chartItem)