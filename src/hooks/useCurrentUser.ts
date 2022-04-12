import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { queryKeys, fetchCurrentUser } from '../api/auth';
import { APIErrorResponse } from '../interfaces';
import { useErrorHandling } from './useErrorHandling';

type UseCurrentUserProps = {
	skipErrorHandling?: boolean;
};

export const useCurrentUser = ({
	skipErrorHandling,
}: UseCurrentUserProps = {}) => {
	const { renderApiErrorToast } = useErrorHandling();
	const navigate = useNavigate();

	const token = window.localStorage.getItem('token');

	return useQuery(queryKeys.fetchCurrentUser, () => fetchCurrentUser(), {
		staleTime: Infinity,
		select: ({ data }) => data,
		onError: (error: APIErrorResponse) => {
			if (skipErrorHandling) return;
			if (token) {
				renderApiErrorToast('Session expired')(error);
			}
			navigate('/login');
		},
	});
};
