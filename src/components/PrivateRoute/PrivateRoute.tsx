import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { RouteProps, Route, Redirect } from 'react-router-dom';

import { auth } from '../../config/firebase';

interface Props extends RouteProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	component?: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	children?: any;
}

export const PrivateRoute = ({
	component: RouteComponent,
	children,
	...rest
}: Props) => {
	const [user, loading, error] = useAuthState(auth);

	if (loading) {
		return (
			<div>
				<p>Initialising User...</p>
			</div>
		);
	}
	if (error) {
		return (
			<div>
				<p>Error: {error}</p>
			</div>
		);
	}
	if (user) {
		return (
			<Route
				{...rest}
				render={(routeProps) =>
					RouteComponent ? <RouteComponent {...routeProps} /> : children
				}
			/>
		);
	}

	return <Redirect to="/login" />;
};
