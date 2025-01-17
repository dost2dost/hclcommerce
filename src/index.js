import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import userReducer from './reducers/userReducer';
import appSettings from './reducers/appSettings';
import addToCart from './reducers/addToCart';
import podReducer from './reducers/podReducer';
const combReducers = combineReducers({
    userToken: userReducer,
    getAppSet: appSettings,
    cart: addToCart,
    podReducer:podReducer

})
const store = createStore(combReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const App1=(props)=>{
    return (
        
    <App></App>
    
    );
}
ReactDOM.render(<Provider store={store}><App1/></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
