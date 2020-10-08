import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Main } from './views/Main/Main';
import { Login } from './views/Login/Login';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';

const App = () => (
	<Router>
		<Switch>
			<Route path="/login">
				<Login />
			</Route>
			<PrivateRoute path="/">
				<Main />
			</PrivateRoute>
		</Switch>
	</Router>
);

export default App;
