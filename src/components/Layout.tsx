import { ReactNode } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../hooks';

interface LayoutProps {
	children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
	const { data: user } = useCurrentUser();
	const navigate = useNavigate();

	const handleLogout = () => {
		window.localStorage.removeItem('token');
		navigate('/login');
	};

	if (!user) return null;

	return (
		<div>
			<Box
				p="3"
				as="nav"
				height="70px"
				display="flex"
				alignItems="center"
				borderBottom="1px solid"
				borderBottomColor="gray.200"
				justifyContent="space-between"
			>
				<Heading
					as="h3"
					role="img"
					size="md"
					cursor="pointer"
					color="blue.400"
					onClick={() => navigate('/')}
				>
					RentABike
				</Heading>
				<Box as="ol" listStyleType="none" display="flex">
					{user.role === 'manager' && (
						<Box as="li" ml="2">
							<Link to="/manage/users">Manage users</Link>
						</Box>
					)}
					{user.role === 'manager' && (
						<Box as="li" ml="2">
							<Link to="/manage/bikes">Manage bikes</Link>
						</Box>
					)}
					<Box as="li" ml="2">
						<Text as="a" onClick={handleLogout}>
							Logout ({user.email})
						</Text>
					</Box>
				</Box>
			</Box>
			<Box as="main" px="3">
				{children}
			</Box>
		</div>
	);
};
