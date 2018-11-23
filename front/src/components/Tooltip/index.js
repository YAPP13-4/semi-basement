// 상태 or 무상태...?
// 리덕스 연결..?
// TODO:
// 1. 툴팁 박스 (아이템의 개수에 따라 가변적으로 변하게 하기)
// 2. 툴팁의 아이템들(icon, text, action(with args)) // props로 받을까...? 아니면 함수의 인자로...?
// 3. 툴팁의 event.(툴팁을 켰다가 다른곳을 누르면 꺼지게 하기)
// 위치 바꾸어야 하나..? hoc 폴더로..?
import React from 'react'

import classnames from 'classnames/bind'
import css from './index.scss'

const cx = classnames.bind(css)
const moduleName = 'Tooltip'

const Tooltip = tooltipFunctions => Component => {
  class _Tooltip extends React.Component {
    constructor(props) {
      super(props)
      this.state = { opacity: false }
      this.state.handleClick = this.handleClick.bind(this)
    }

    handleClick(e) {
      this.setState({ opacity: !this.state.opacity })
      e.stopPropagation()
    }

    render() {
      const style = {
        opacity: +this.state.opacity,
        zIndex: this.state.opacity ? 1000 : -1000,
        top: 60,
        left: -210,
        position: 'absolute'
      }

      console.log(tooltipFunctions)
      debugger

      return (
        <div>
          <Component {...this.state} {...this.props} />
          <div style={style} className={cx(`${moduleName}`)}>
            <div className={cx(`${moduleName}-arrow`)} />
            <div
              className={cx(`${moduleName}-innerFirst`)}
              onClick={e => {
                this.props.onClickAdd(e)
                this.toggle(e)
              }}
            >
              <div className={cx(`${moduleName}-innerFirst-addIcon`)} />
              <span>add</span>
            </div>
            <div
              className={cx(`${moduleName}-innerSecond`)}
              onClick={() => {
                alert('share!')
              }}
            >
              <div className={cx(`${moduleName}-innerSecond-shareIcon`)} />
              <span>share</span>
            </div>
            <div
              className={cx(`${moduleName}-innerThird`)}
              onClick={() => {
                alert('like!')
              }}
            >
              <div className={cx(`${moduleName}-innerThird-likeIcon`)} />
              <span>like</span>
            </div>
          </div>
        </div>
      )
    }
  }
  return _Tooltip
}

export default Tooltip
