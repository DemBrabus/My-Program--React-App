import React from 'react';
import ReactDOM from 'react-dom';
import './styles/global.scss';
import App from './components/App/App';
import * as serviceWorker from './misc/serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
