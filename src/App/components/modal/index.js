import React from "react"
import classnames from "classnames/bind"

import css from "./index.scss"

const cx = classnames.bind(css)
const moduleName = "Modal"

const Modal = ({ handleClose, showModal }) => {
  const showHideClassName = showModal ? "display-block" : "display-none"
  return (
    <div className={cx(`${moduleName}`)}>
      <div className={cx(`${moduleName}-${showHideClassName}`)}>
        <section
          className={cx(`${moduleName}-${showHideClassName}-modal-main`)}
        >
          Coming soon.
          <button className="btn" onClick={handleClose}>
            Close
          </button>
        </section>
      </div>
    </div>
  )
}
export default Modal
