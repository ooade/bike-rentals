import { Routes as ReactRoutes, Route } from 'react-router-dom';

import { ProtectedRoute } from './ProtectedRoute';
import { Login, CreateAccount } from './auth';
import { ErrorPage } from '../components';
import Reservations from './reservations';
import { Manage } from './manage';
import Home from './home';

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
				path="reservations"
				element={
					<ProtectedRoute>
						<Reservations />
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
