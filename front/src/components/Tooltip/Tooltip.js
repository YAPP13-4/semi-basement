// 상태 or 무상태...?
// 리덕스 연결..?
// TODO:
// 1. 툴팁 박스
// 2. 툴팁의 아이템들(icon, text, action(with args)) // props로 받을까...?
// 3. 툴팁의 event.(툴팁을 켰다가 다른곳을 누르면 꺼지게 하기)
import React from 'react'

const Tooltip = Component => {
  class _Tooltip extends React.Component {
    constructor(props) {
      super(props)
      this.state = { opacity: false }
    }

    render() {
      console.log(this.state)
      return <Component {...this.state} {...this.props} />
    }
  }
  return _Tooltip
}

export default Tooltip