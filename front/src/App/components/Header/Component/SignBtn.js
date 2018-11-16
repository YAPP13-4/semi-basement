import React, { PureComponent } from "react"
import { Link } from "react-router-dom"
import classnames from "classnames/bind"
import css from "./SignBtn.scss"
const cx = classnames.bind(css)
const moduleName = "Header"
export default class SignBtn extends PureComponent {
  render() {
    return (
      <div className={cx(`${moduleName}-rightSide-user`)}>
        {/* sing up, sign in btn  a tag must be Link!!!*/}
        {/* FIX ME ..... */}
        <Link to="/sign">
          <span className={cx(`${moduleName}-rightSide-user-signIn`)}>
            Sign In
          </span>
        </Link>
        <Link to="/sign">
          <span
            style={{
              backgroundColor: "#45f7aa",
              color: "#020202",
              border: "none"
            }}
          >
            Sign Up
          </span>
        </Link>
      </div>
    )
  }
}
