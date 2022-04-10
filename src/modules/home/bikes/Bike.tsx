import { useMutation, useQueryClient } from 'react-query';
import { Box, Button, Image } from '@chakra-ui/react';

import { Rating } from '../../../components';
import { queryKeys, rateBike } from '../../../api/bikes';
import { PinIcon } from '../../../components/icons';
import { formatCloudinaryImageUrl } from '../../../utilities';
import { useErrorHandling, useSuccessToast } from '../../../hooks';
import { APIErrorResponse, Bike as BikeInterface } from '../../../interfaces';

interface BikeProps {
	bike: BikeInterface;
}

const Bike = ({ bike }: BikeProps) => {
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
		<Box mb="5" position="relative" display="inline-block">
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
						minWidth="400px"
						minHeight="400px"
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
				<Button size="sm" colorScheme="blue">
					Reserve
				</Button>
			</Box>
		</Box>
	);
};

export default Bike;
