import React from 'react';
import { Provider } from 'react-redux';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Outlet,
} from 'react-router-dom';
import store from './redux';

function App() {
    return (
        <Provider store={store}>
            <Outlet />
        </Provider>
    );
}

export default App;
