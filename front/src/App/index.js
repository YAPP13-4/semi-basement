import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import { Switch, Route, withRouter } from 'react-router-dom'
import classnames from 'classnames/bind'

import routes from './routes'
import css from './index.scss'
import Header from './components/Header'
import Footer from './components/Footer'

const cx = classnames.bind(css)
const moduleName = 'App'

class App extends Component {
  render() {
    return (
      <div className={cx(`${moduleName}`)}>
        <Header />
        <div className={cx(`${moduleName}-body`)}>
          <Switch>
            {routes.map(({ ...routeProps }) => (
              <Route {...routeProps} key={routeProps.path || ''} />
            ))}
          </Switch>
        </div>
        <Footer />
      </div>
    )
  }
}

export default hot(module)(withRouter(App))
