import { Box, Spinner } from '@chakra-ui/react';

export const ContentLoader = () => {
	return (
		<Box textAlign="center" my="6">
			<Spinner />
		</Box>
	);
};
