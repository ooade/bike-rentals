import { Box, Input } from '@chakra-ui/react';
import { Layout } from '../../components';
import { useCurrentUser } from '../../hooks';

export const Home = () => {
	const { data: user } = useCurrentUser();

	if (!user) return null;

	return (
		<Layout>
			<Box height="200px" display="flex" alignItems="center" p="5">
				<Input placeholder="Search for bikes" height="60px" />
			</Box>
		</Layout>
	);
};
