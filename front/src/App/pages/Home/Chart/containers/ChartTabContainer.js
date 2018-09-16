import React ,{Component} from 'react'
import classnames from 'classnames/bind'
import css from './ChartTabContainer.scss';
import getImageUrl from '../../../../../utils/ImageUtils'
import IMAGE_SIZES from '../../../../constants/ImageConstants'

const cx         = classnames.bind(css)
const moduleName = 'ChartTabContainer'

class chartItem extends Component{

    render() {

        return (
            <div className={cx(`${moduleName}`)}>
                <table>
                    <tr>
                        <td >{this.props.key} </td>
                        <td onClick={this.props.selected}>
                            <img  src={`url(${getImageUrl(this.props.artwork, IMAGE_SIZES.LARGE)})`}/>
                        </td>
                        <td onClick={this.props.selected}>Lucid Dreams</td>
                        <td>{this.props.title}</td>
                        <td>{this.props.singer}</td>
                        <td>02: 27(time)</td>
                        <td>icons</td>
                    </tr>
                </table>
            </div>

        )
    }
}

export default chartItem