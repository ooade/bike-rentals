import { useToast } from '@chakra-ui/react';
import { useCallback } from 'react';

import { APIErrorResponse } from '../interfaces';

export const useErrorHandling = () => {
	const toast = useToast();

	const renderApiErrorToast = useCallback(
		(defaultTitle: string) => {
			return (error: Partial<APIErrorResponse>) => {
				toast({
					status: 'error',
					title: error?.message || defaultTitle,
					description: error?.error || '',
				});
			};
		},
		[toast]
	);

	return {
		renderApiErrorToast,
	};
};
