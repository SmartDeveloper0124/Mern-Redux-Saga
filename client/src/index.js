import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter,
    Route
} from 'react-router-dom';
import { Provider } from 'react-redux';
import routes from './routes';
import { config } from './config';

/* -------- Harmony Features --------- */
import WSAction from './base/features/harmony-redux-websocket-actions';
import ConnectedIntlProvider from './base/features/harmony-i18n/IntlProvider';
import Store from './base/features/harmony-store';
/* -------- Mocks Configuration --------- */
import './mocks';

/* -------- turn on WS actions ---------- */
const wsAction = new WSAction(Store, config.ROOT_WS_URL, {
    retryCount: 3,
    reconnectInterval: 3
});

wsAction.start();

/* -------- render application ---------- */
ReactDOM.render(
    <Provider store={Store}>
        <ConnectedIntlProvider>
            <HashRouter>
                {routes}
            </HashRouter>
        </ConnectedIntlProvider>
    </Provider>
    , document.querySelector('.container'));
