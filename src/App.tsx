import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Main } from './views/Main/Main';
import { Login } from './views/Login/Login';

const App = () => (
	<Router>
		<Switch>
			<Route path="/login">
				<Login />
			</Route>
			<Route path="/">
				<Main />
			</Route>
		</Switch>
	</Router>
);

export default App;
