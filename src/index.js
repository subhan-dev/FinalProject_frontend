import React from 'react'
import ReactDOM from 'react-dom'
import Thunk from 'redux-thunk'
import Logger from 'redux-logger'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'

import 'bootstrap/dist/css/bootstrap.min.css'

// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "bootstrap-css-only/css/bootstrap.min.css";
// import "mdbreact/dist/css/mdb.css";

import App from './components/App'
import Reducers from './reducers/index'

const STORE = createStore(Reducers, applyMiddleware(Thunk, Logger))

ReactDOM.render(
    <Provider store = {STORE}>
        <App/>
    </Provider>,
    document.getElementById('root'))