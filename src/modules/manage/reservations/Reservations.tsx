import {
	Tr,
	Th,
	Td,
	Box,
	Thead,
	Tbody,
	Table,
	TableContainer,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { fetchReservationUsers, queryKeys } from '../../../api/reservations';
import { ContentLoader, NoData } from '../../../components';
import ReservationDetails from './ReservationDetails';
import { useErrorHandling } from '../../../hooks';
import { formatDate } from '../../../utilities';
import { ChevronRight } from '../../../components/icons';

const Reservations = () => {
	const navigate = useNavigate();
	const { renderApiErrorToast } = useErrorHandling();
	const params = useParams<{ id: string }>();

	const {
		isError,
		isLoading,
		isSuccess,
		data: users = [],
	} = useQuery(queryKeys.fetchReservationUsers, () => fetchReservationUsers(), {
		select: ({ data }) => data,
		onError: renderApiErrorToast('Could not fetch users'),
	});

	if (isLoading) return <ContentLoader />;

	if ((isSuccess && users.length === 0) || isError) {
		return <NoData title="No reservations found :(" />;
	}

	return (
		<Box display="flex">
			<TableContainer mt="4" flex="1">
				<Table>
					<Thead>
						<Tr>
							<Th>Email address</Th>
							<Th>Reserved from</Th>
							<Th>Reserved till</Th>
						</Tr>
					</Thead>
					<Tbody data-testid="reservation-users">
						{users.map(({ id, from, to, email }, index) => (
							<Tr
								key={id}
								cursor="pointer"
								_hover={{ bg: 'gray.50' }}
								bg={params.id === id ? 'gray.100' : ''}
								data-testid={`reservation-user-${index}`}
								onClick={() => navigate(`/manage/reservations/${id}`)}
							>
								<Td>{email}</Td>
								<Td>{formatDate(from)}</Td>
								<Td>
									{formatDate(to)} {params.id === id && <ChevronRight ml="3" />}
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>
			<Box flex="1" boxShadow="sm" bg="white">
				<ReservationDetails />
			</Box>
		</Box>
	);
};

export default Reservations;
