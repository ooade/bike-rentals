import { useState } from 'react';
import { useQuery } from 'react-query';
import { Box, Button, useMediaQuery } from '@chakra-ui/react';

import Bike from './Bike';
import AddBikeModal from './AddBikeModal';
import { useErrorHandling } from '../../../hooks';
import { ContentLoader } from '../../../components';
import { fetchBikes, queryKeys } from '../../../api/bikes';

export const ManageBikes = () => {
	const { renderApiErrorToast } = useErrorHandling();
	const [isAddBikeModalOpen, setIsAddBikeModalOpen] = useState(false);
	const [isMediumScreen, isLargeScreen] = useMediaQuery([
		'(min-width: 50em)',
		'(min-width: 80em)',
	]);

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
			<Button ml="6" onClick={() => setIsAddBikeModalOpen(true)}>
				Add new bike
			</Button>
			<Box
				mx="6"
				mt="4"
				style={{ columnCount: isLargeScreen ? 3 : isMediumScreen ? 2 : 1 }}
			>
				{bikes.map((bike) => (
					<Bike key={bike.id} bike={bike} />
				))}
			</Box>
		</Box>
	);
};
