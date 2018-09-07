import React ,{Component} from 'react'
import classnames from 'classnames/bind'
import css from './Landing.scss'
import landingtitle from '../../assets/landing-title.png'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { landing } from '../../actions/index'
const cx = classnames.bind(css)
const moduleName = 'Landing'

class Landing extends Component {
    constructor(props) {
        super(props)

        this.state = { term : 1}
        this._getInto = this._getInto.bind(this)
    }
    _getInto(event) {
        this.setState({
            term : 1
        });
        this.props.landing(this.state.term)
    }
    render() {
        return (
            <div className={cx(`${moduleName}`)}>
                <div className={cx(`${moduleName}-logoWrapper`)}>
                    <img src={landingtitle} alt="landing title"/>
                    <a>
                        <span>GET INTO</span>
                    </a>
                </div>
            </div>
        )
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({landing} , dispatch)
}

export default connect(null, mapDispatchToProps)(Landing)