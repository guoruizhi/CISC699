import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';

import store from './store/configureStore';
import App from './components/App';

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);