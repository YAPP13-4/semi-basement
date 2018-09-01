import React, { Component } from 'react';
import { hot } from 'react-hot-loader'
import { Switch, Route, withRouter } from 'react-router-dom';
import routes from './routes';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          {routes.map(({ ...routeProps }) => (
            <Route {...routeProps} key={routeProps.path || ''}/>
          ))}
        </Switch>
      </div>
    );
  }
}

export default hot(module)(withRouter(App))
