import { Routes as ReactRoutes, Route } from 'react-router-dom';

import Home from './home';
import { Login, CreateAccount } from './auth';
import { ProtectedRoute } from './ProtectedRoute';
import { ErrorPage } from '../components';
import { Manage } from './manage';

const Routes = () => {
	return (
		<ReactRoutes>
			<Route
				path="/"
				element={
					<ProtectedRoute>
						<Home />
					</ProtectedRoute>
				}
			/>
			<Route
				path="manage/*"
				element={
					<ProtectedRoute>
						<Manage />
					</ProtectedRoute>
				}
			/>
			<Route path="register" element={<CreateAccount />} />
			<Route path="login" element={<Login />} />
			<Route path="*" element={<ErrorPage />} />
		</ReactRoutes>
	);
};

export default Routes;
