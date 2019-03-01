import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import createHistory from 'history/createBrowserHistory';

import App from 'src/App';
import createNewStore from 'src/redux/createNewStore';

import registerServiceWorker from './registerServiceWorker';
import './index.css';

const history = createHistory();
const store = createNewStore(history);

const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Component />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
  );
};

console.log(process.env);

render(App);

registerServiceWorker();
