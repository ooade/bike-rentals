import { useQuery } from 'react-query';
import { Box, Flex, Heading } from '@chakra-ui/react';

import { fetchReservations, queryKeys } from '../../api/reservations';
import { ContentLoader, Layout, NoData } from '../../components';
import { useErrorHandling } from '../../hooks';
import Reservation from './Reservation';

const Reservations = () => {
	const { renderApiErrorToast } = useErrorHandling();

	const {
		data: reservations = [],
		isLoading,
		isSuccess,
	} = useQuery(queryKeys.fetchReservations, () => fetchReservations(), {
		select: ({ data }) => data,
		onError: renderApiErrorToast('Could not fetch reservations'),
	});

	if (isLoading) {
		return <ContentLoader />;
	}

	return (
		<Layout>
			<Box p="3" mt="4">
				<Heading as="h3" size="md" ml="3">
					Reservations
				</Heading>
				{isSuccess && reservations.length === 0 && (
					<NoData title="No reservations yet :)" />
				)}
				<Flex flexWrap="wrap" data-testid="reservations">
					{reservations.map((reservation, index) => (
						<Reservation
							key={reservation.id}
							reservation={reservation}
							data-testid={`reservation-${index}`}
						/>
					))}
				</Flex>
			</Box>
		</Layout>
	);
};

export default Reservations;
