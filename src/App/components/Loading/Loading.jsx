import React, { PureComponent } from "react"
import Lottie from "react-lottie"
import * as animationData from "src/assets/loading.json"
import classnames from "classnames/bind"
import css from "./Loading.scss"
const cx = classnames.bind(css)
const moduleName = "Loading"
class Loading extends PureComponent {
  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    }
    return (
      <div className={cx(`${moduleName}`)}>
        <Lottie options={defaultOptions} height={250} width={250} />
      </div>
    )
  }
}

export default Loading
