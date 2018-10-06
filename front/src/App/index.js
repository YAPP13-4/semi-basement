import React, { Component } from "react"
import { hot } from "react-hot-loader"
import { Switch, Route, withRouter } from "react-router-dom"
import classnames from "classnames/bind"

import routes from "./routes"
import css from "./index.scss"
import Header from "./components/Header"

import NavBar from "../App/components/Header/navBar"

import PlayerContainer from "../App/container/PlayerContainer"
const cx = classnames.bind(css)
const moduleName = "App"

class App extends Component {
  render() {
    return (
      <div className={cx(`${moduleName}`)}>
        <Header />
        <div className={cx(`${moduleName}-body`)}>
          <Switch>
            {routes.map(({ ...routeProps }) => (
              <Route {...routeProps} key={routeProps.path || ""} />
            ))}
          </Switch>
          <PlayerContainer />
        </div>
        <NavBar />
      </div>
    )
  }
}

export default hot(module)(withRouter(App))
