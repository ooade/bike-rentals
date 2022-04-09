import { Box, Spinner } from '@chakra-ui/react';

export const PageLoader = () => (
	<Box
		display="flex"
		height="100vh"
		alignItems="center"
		justifyContent="center"
	>
		<Spinner />
	</Box>
);
