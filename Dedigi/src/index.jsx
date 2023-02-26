import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import rootReducer from './redux/rootReducer';
import App from './App';
import reportWebVitals from './reportWebVitals';

const SENTRY_DSN = 'https://1353005cecf547b190d3b069f5f792eb@o968103.ingest.sentry.io/5919514';

Sentry.init({
  environment: process.env.NODE_ENV,
  dsn: SENTRY_DSN,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 0.8,
});

// eslint-disable-next-line no-underscore-dangle
let composeEnhancers = compose;
if (process.env.NODE_ENV === 'development') {
  composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
}
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
