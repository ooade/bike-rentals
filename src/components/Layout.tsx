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
		<Box display="flex">
			<Box as="aside" width="250px" boxShadow="xl" height="100vh">
				<Box
					p="4"
					height="70px"
					borderBottom="1px solid"
					borderBottomColor="gray.200"
				>
					<Heading
						as="h3"
						role="img"
						size="md"
						cursor="pointer"
						color="blue.400"
						textAlign="center"
						onClick={() => navigate('/')}
					>
						RentABike
					</Heading>
				</Box>

				<Box as="ol" listStyleType="none" mt="6">
					<Text
						px="5"
						py="3"
						fontWeight="600"
						fontSize="sm"
						textTransform="uppercase"
					>
						Your space
					</Text>
					<Box as="li" px="5" py="2">
						<Link to="/">Home</Link>
					</Box>
					<Box as="li" px="5" py="2">
						<Link to="/reservations">Bike reservations</Link>
					</Box>

					{user.role === 'manager' && (
						<>
							<Text
								px="5"
								py="3"
								fontWeight="600"
								fontSize="sm"
								textTransform="uppercase"
							>
								Management
							</Text>
							<Box as="li" px="5" py="2">
								<Link to="/manage/users">Manage users</Link>
							</Box>
							<Box as="li" px="5" py="2">
								<Link to="/manage/bikes">Manage bikes</Link>
							</Box>
							<Box as="li" px="5" py="2">
								<Link to="/manage/reservations">Manage user reservations</Link>
							</Box>
						</>
					)}
				</Box>
			</Box>
			<Box height="100vh" flex="1" width="calc(100vh - 250px)">
				<Box
					p="3"
					as="nav"
					height="70px"
					display="flex"
					alignItems="center"
					borderBottom="1px solid"
					justifyContent="flex-end"
					borderBottomColor="gray.200"
				>
					<Text as="a" onClick={handleLogout}>
						Logout ({user.email})
					</Text>
				</Box>
				<Box as="main" px="3" overflowY="auto" height="calc(100% - 70px)">
					{children}
				</Box>
			</Box>
		</Box>
	);
};
