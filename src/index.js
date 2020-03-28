//React
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

//Redux
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import mainReducer from './store/reducers/mainReducer';
import authReducer from './store/reducers/authReducer';

//Styles
import './styles/global.scss';

//App Component
import App from './components/App/App';
import * as serviceWorker from './misc/serviceWorker';

//Init Redux / State
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
  main: mainReducer,
  auth: authReducer
})
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(
            <Provider store={ store }>
              <BrowserRouter>
                <App /> 
              </BrowserRouter>
            </Provider>
                , document.getElementById('root'));

serviceWorker.unregister();
