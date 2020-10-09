import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Main } from './views/Main/Main';
import { Login } from './views/Login/Login';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { NotificationContextProvider } from './contexts/NotificationContext';
import { Layout } from './Layout';

const App = () => (
	<NotificationContextProvider>
		<Router>
			<Switch>
				<Layout>
					<Route path="/login">
						<Login />
					</Route>
					<PrivateRoute path="/">
						<Main />
					</PrivateRoute>
				</Layout>
			</Switch>
		</Router>
	</NotificationContextProvider>
);

export default App;
