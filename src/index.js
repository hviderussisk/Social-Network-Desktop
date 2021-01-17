import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass';
import * as serviceWorker from './serviceWorker';
import store from './redux/redux-store'
import {Provider} from 'react-redux'
import AppContainer from './AppCONTAINER';

let reRenderDom = () => {
  ReactDOM.render(
      <Provider store={store}>
        <AppContainer/>
      </Provider>,
    document.getElementById('root')
  );
}

reRenderDom(store.getState())

store.subscribe(reRenderDom)

serviceWorker.unregister();