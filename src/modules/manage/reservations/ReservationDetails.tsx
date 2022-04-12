import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { Box, Text, Image, Flex } from '@chakra-ui/react';

import { ContentLoader } from '../../../components';
import { formatCloudinaryImageUrl, formatDate } from '../../../utilities';
import { fetchUserReservations, queryKeys } from '../../../api/reservations';

const ReservationDetails = () => {
	const params = useParams<{ id: string }>();

	const { data: userReservations = [], isLoading } = useQuery(
		[queryKeys.fetchUserReservations, params.id],
		() => fetchUserReservations(params?.id ?? ''),
		{
			select: ({ data }) => data,
			enabled: !!params?.id,
		}
	);

	if (isLoading) return <ContentLoader />;

	return (
		<Flex
			py="3"
			flexWrap="wrap"
			overflowY="scroll"
			justifyContent="center"
			height="calc(100vh - 70px)"
			data-testid="user-reservations"
		>
			{!params.id && (
				<Text fontWeight="600" mt="10">
					Select a user to view their reservations
				</Text>
			)}
			{userReservations.map((reservation) => (
				<Box p="3" key={reservation.id} width="300px" mb="2">
					<Image
						width="300px"
						height="300px"
						borderRadius="md"
						objectFit="cover"
						src={formatCloudinaryImageUrl(reservation.bike.image.secure_url)}
					/>
					<Box mt="2" display="flex" justifyContent="space-between">
						<Text fontWeight="600">Model</Text>
						<Text>{reservation.bike.model}</Text>
					</Box>
					<Box mt="2" display="flex" justifyContent="space-between">
						<Text fontWeight="600">Location</Text>
						<Text>{reservation.bike.location}</Text>
					</Box>
					<Box mt="2" display="flex" justifyContent="space-between">
						<Text fontWeight="600">Reserved from</Text>
						<Text>{formatDate(reservation.from)} </Text>
					</Box>
					<Box mt="2" display="flex" justifyContent="space-between">
						<Text fontWeight="600">Reserved till</Text>
						<Text>{formatDate(reservation.to)} </Text>
					</Box>
				</Box>
			))}
		</Flex>
	);
};

export default ReservationDetails;
