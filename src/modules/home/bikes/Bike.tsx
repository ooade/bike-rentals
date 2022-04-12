import { Box, Button, Image } from '@chakra-ui/react';
import { useMutation, useQueryClient } from 'react-query';

import { Rating } from '../../../components';
import { PinIcon } from '../../../components/icons';
import { queryKeys, rateBike } from '../../../api/bikes';
import { formatCloudinaryImageUrl } from '../../../utilities';
import { useErrorHandling, useSuccessToast } from '../../../hooks';
import { APIErrorResponse, Bike as BikeInterface } from '../../../interfaces';
import { useState } from 'react';
import ReserveBikeModal from './ReserveBikeModal';

interface BikeProps {
	bike: BikeInterface;
}

const Bike = ({ bike }: BikeProps) => {
	const [isReserveBikeModalOpen, setIsReserveBikeOpen] = useState(false);
	const { renderApiSuccessToast } = useSuccessToast();
	const { renderApiErrorToast } = useErrorHandling();
	const queryClient = useQueryClient();

	const formattedBikeImageUrl = formatCloudinaryImageUrl(
		bike.image.secure_url,
		'c_scale,w_500,fl_progressive'
	);

	const rateBikeMutation = useMutation(
		(rate: number) => rateBike({ id: bike.id, rate }),
		{
			onSuccess: (response) => {
				renderApiSuccessToast('Bike rated successfully')(response.data);
				queryClient.invalidateQueries(queryKeys.fetchBikes);
			},
			onError: (error: APIErrorResponse) => {
				renderApiErrorToast('Could not rate bike')(error);
			},
		}
	);

	return (
		<div>
			{isReserveBikeModalOpen && (
				<ReserveBikeModal
					bike={bike}
					onClose={() => setIsReserveBikeOpen(false)}
				/>
			)}
			<Box m="3">
				<Box
					mb="1"
					key={bike.id}
					borderRadius="10px"
					border="1px solid"
					borderColor="gray.100"
					transition="all 0.2s ease"
				>
					<Box
						height="20px"
						width="100%"
						bg={bike.color}
						borderRadius="10px 10px 0px 0px"
					/>
					<div>
						<Image
							width="400px"
							height="400px"
							objectFit="cover"
							alt={`${bike.model} bike`}
							src={formattedBikeImageUrl}
						/>
					</div>
					<Box p="3" display="flex" justifyContent="space-between">
						<div>{bike.model}</div>
						<Box display="flex" alignItems="center">
							<PinIcon />
							{bike.location}
						</Box>
					</Box>
				</Box>
				<Box display="flex" justifyContent="space-between">
					<Box display="flex">
						<Rating
							value={bike.averageRate || 0}
							onChange={(rate) => rateBikeMutation.mutate(rate)}
						/>
					</Box>
					<Button
						size="sm"
						colorScheme="blue"
						onClick={() => setIsReserveBikeOpen(true)}
					>
						Reserve
					</Button>
				</Box>
			</Box>
		</div>
	);
};

export default Bike;
