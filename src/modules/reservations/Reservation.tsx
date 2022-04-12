import { useState } from 'react';
import { Box, Image, Text, Button } from '@chakra-ui/react';

import { formatCloudinaryImageUrl, formatDate } from '../../utilities';
import CancelReservationModal from './CancelReservationModal';
import { Rating } from '../../components';
import {
	Reservation as ReservationInterface,
	Rating as RatingInterface,
} from '../../interfaces';

interface ReservationProps {
	reservation: ReservationInterface;
}

const Reservation = ({ reservation }: ReservationProps) => {
	const [isShowCancelReservation, setIsShowCancelReservation] = useState(false);

	const averageRatings = (ratings: RatingInterface[]) => {
		return (
			ratings.reduce((sum, value) => (sum += value.rate), 0) / ratings.length
		);
	};
	return (
		<>
			{isShowCancelReservation && (
				<CancelReservationModal
					reservation={reservation}
					onClose={() => setIsShowCancelReservation(false)}
				/>
			)}
			<Box p="3" key={reservation.id} width="300px">
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
					<Text fontWeight="600">Rate average</Text>
					<Box>
						<Rating
							value={
								reservation.bike?.ratings?.length > 0
									? averageRatings(reservation.bike.ratings)
									: 0
							}
						/>
					</Box>
				</Box>

				<Box mt="2" display="flex" justifyContent="space-between">
					<Text fontWeight="600">Reserved from</Text>
					<Text>{formatDate(reservation.from)} </Text>
				</Box>
				<Box mt="2" display="flex" justifyContent="space-between">
					<Text fontWeight="600">Reserved till</Text>
					<Text>{formatDate(reservation.to)} </Text>
				</Box>
				<Box mt="3" textAlign="center">
					<Button
						size="sm"
						colorScheme="red"
						onClick={() => setIsShowCancelReservation(true)}
					>
						Cancel Reservation
					</Button>
				</Box>
			</Box>
		</>
	);
};

export default Reservation;
