import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import { routerReducer, routerMiddleware } from "react-router-redux";
import ReduxThunk from "redux-thunk";
import reducer from "src/redux/reducers";

export default function createNewStore(history) {
  const routerMw = routerMiddleware(history);

  const store = createStore(
    combineReducers({
      router: routerReducer,
      ...reducer
    }),
    {},
    compose(
      applyMiddleware(routerMw, ReduxThunk),
      typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f
    )
  );

  if (module.hot) {
    module.hot.accept(() => {
      store.replaceReducer(require("src/redux/reducers").default);
    });
  }

  return store;
}
