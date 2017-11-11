import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'
import SearchPage from './components/SearchPage';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers/';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('.container')
);
