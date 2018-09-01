import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
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

export default App;
