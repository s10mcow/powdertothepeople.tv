import * as styles from './styles.scss';
import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import webcams from './reducers'

const rootEl = document.getElementById('root');
const store = createStore(webcams);

const render = Component =>
    ReactDOM.render(
        <Provider store={store}>
            <AppContainer>
                <Component />
            </AppContainer>
        </Provider>,
    rootEl
);

// register service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}

render(App);
if (module.hot) module.hot.accept('./App', () => render(App));
//if (location.protocol != 'https:') { location.href = 'https:' + window.location.href.substring(window.location.protocol.length); }
