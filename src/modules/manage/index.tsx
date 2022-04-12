import { Outlet, Route, Routes } from 'react-router-dom';
import { ErrorPage, Layout } from '../../components';
import { useCurrentUser } from '../../hooks';

import { ProtectedRoute } from '../ProtectedRoute';
import Reservations from './reservations';
import ManageBikes from './bikes';
import ManageUsers from './users';

export const Manage = () => {
	const { data: user } = useCurrentUser();
	const isAuthorizedToManageUsers = user && user.role === 'manager';

	if (!isAuthorizedToManageUsers) return <ErrorPage />;

	return (
		<Layout>
			<Outlet />
			<Routes>
				<Route
					path="users"
					element={
						<ProtectedRoute>
							<ManageUsers />
						</ProtectedRoute>
					}
				/>
				<Route
					path="bikes"
					element={
						<ProtectedRoute>
							<ManageBikes />
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
					path="reservations/:id"
					element={
						<ProtectedRoute>
							<Reservations />
						</ProtectedRoute>
					}
				/>
				<Route path="*" element={<ErrorPage />} />
			</Routes>
		</Layout>
	);
};
