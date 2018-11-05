import React, { Fragment, PureComponent } from "react"
import classnames from "classnames/bind"
import FeaturedComponent from "./FeatureComponent"
import Modal from "src/App/components/modal"
import { featureInfo } from "./constant/featurInfo"
import css from "./index.scss"

const cx = classnames.bind(css)
const moduleName = "Featured"
//여기에서 정보 가지고 있고, map 돌면서 FeaturedComponent에 넘겨주는 방식.

class Featured extends PureComponent {
  state = {
    showModal: false
  }
  showModal = () => {
    this.setState(() => {
      console.log("showModal", this.state.showModal)
      return {
        showModal: true
      }
    })
  }
  hideModal = () => {
    this.setState(() => {
      console.log("hideModal", this.state.showModal)
      return {
        showModal: false
      }
    })
  }
  renderFeature = () => {
    return featureInfo.map((item, index) => {
      return (
        <FeaturedComponent
          key={index}
          kind={item.kind}
          icon={item.iconPosition}
          width={item.width}
          popUp={this.showModal}
        />
      )
    })
  }

  render() {
    return (
      <Fragment>
        <Modal showModal={this.state.showModal} handleClose={this.hideModal} />
        <div className={cx(`${moduleName}`)}>
          <div className={cx(`${moduleName}-top`)}>
            <div className={cx(`${moduleName}-top-inner`)}>
              <div className={cx(`${moduleName}-top-inner-left`)} />
              <div className={cx(`${moduleName}-top-inner-mid`)}>Featured</div>
              <div className={cx(`${moduleName}-top-inner-right`)} />
            </div>
          </div>
          <div className={cx(`${moduleName}-mid`)}>{this.renderFeature()}</div>
        </div>
      </Fragment>
    )
  }
}

export default Featured
