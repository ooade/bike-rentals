import { Link } from 'react-router-dom';
import { Box, Image, Text } from '@chakra-ui/react';

import errorIllustration from '../assets/error.svg';

export const ErrorPage = () => {
	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			height="100vh"
		>
			<Box>
				<Image alt="" src={errorIllustration} objectFit="none" />
				<Text textAlign="center" mt="4">
					This page doesn't exist :( Click to{' '}
					<Link to="/"> get back to the homepage </Link>
				</Text>
			</Box>
		</Box>
	);
};
