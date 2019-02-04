import React, {Component} from 'react';
import classnames from 'classnames/bind';
import css from './index.scss';

const cx = classnames.bind(css);
const moduleName = 'MusicRegister';
class MusicRegister extends Component {
    render() {
        return <div className={cx(`${moduleName}`)}>
            <h1>Register Song</h1>
            <div className={cx(`${moduleName}-body`)}>
                <div className={cx(`${moduleName}-inputs`)}>
                    inputs
                </div>
                <div className={cx(`${moduleName}-albumCover`)}>
                    ablum cover
                </div>
            </div>
        </div>
    }
}

export default MusicRegister