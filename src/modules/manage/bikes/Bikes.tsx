import { useState } from 'react';
import { useQuery } from 'react-query';
import { Box, Button, Flex } from '@chakra-ui/react';

import Bike from './Bike';
import AddBikeModal from './AddBikeModal';
import { useErrorHandling } from '../../../hooks';
import { ContentLoader } from '../../../components';
import { fetchBikes, queryKeys } from '../../../api/bikes';

export const ManageBikes = () => {
	const { renderApiErrorToast } = useErrorHandling();
	const [isAddBikeModalOpen, setIsAddBikeModalOpen] = useState(false);

	const { data: bikes = [], isLoading } = useQuery(
		queryKeys.fetchBikes,
		() => fetchBikes(),
		{
			select: ({ data }) => data,
			onError: renderApiErrorToast('Could not fetch bikes'),
		}
	);

	if (isLoading) return <ContentLoader />;

	return (
		<Box my="10">
			{isAddBikeModalOpen && (
				<AddBikeModal onClose={() => setIsAddBikeModalOpen(false)} />
			)}
			<Button ml="4" onClick={() => setIsAddBikeModalOpen(true)}>
				Add new bike
			</Button>
			<Flex flexWrap="wrap" data-testid="bikes">
				{bikes.map((bike, index) => (
					<Bike data-testid={`bike-${index}`} key={bike.id} bike={bike} />
				))}
			</Flex>
		</Box>
	);
};
