// import 'babel-polyfill';
import React from 'react';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import App from './components/index';
import {store} from './state/config';

const container = document.getElementById('app');
if (container) {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    container,
    () => {
      console.log('Application was mounted');
    },
  );
}

console.log(process.env.NODE_ENV, 'MODE IN REACT');

/**
 * Plans:
 * - CSS in JS (in resume) --- DONE!
 * - React Router --- DONE!
 * - MobX --- DONE!
 * - wallaby --- DONE!
 * - CSS-GRIDS (in resume) --- ???
 * - Tests: 1 part - (jest, enzyme): REACTJS, 2 part - (mocha, chai): NODEJS
 * - TypeScript
 * */
