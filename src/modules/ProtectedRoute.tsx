import { PageLoader } from '../components';

import { useCurrentUser } from '../hooks';

interface ProtectedRouteProps {
	children: JSX.Element;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const { isLoading } = useCurrentUser();

	if (isLoading) {
		return <PageLoader />;
	}

	return children;
};
