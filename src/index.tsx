import React from 'react';
import ReactDOM from 'react-dom';
import './assets/main.css';
import 'balloon-css';
import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';

import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

LogRocket.init('xxxx11/xxxxxx');
setupLogRocketReact(LogRocket);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
