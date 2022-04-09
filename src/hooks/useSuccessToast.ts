import { useToast } from '@chakra-ui/react';
import { useCallback } from 'react';

import { APISuccessResponse } from '../interfaces';

export const useSuccessToast = () => {
	const toast = useToast();

	const renderApiSuccessToast = useCallback(
		<T>(defaultDescription: string) => {
			return (response: Partial<APISuccessResponse<T>>) => {
				toast({
					status: 'success',
					title: 'Success',
					description: response.message || defaultDescription,
				});
			};
		},
		[toast]
	);

	return {
		renderApiSuccessToast,
	};
};
