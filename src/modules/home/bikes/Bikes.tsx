import { useQuery } from 'react-query';
import { Box, useMediaQuery } from '@chakra-ui/react';

import Bike from './Bike';
import { useErrorHandling } from '../../../hooks';
import { ContentLoader } from '../../../components';
import { fetchBikes, queryKeys } from '../../../api/bikes';

export const Bikes = () => {
	const { renderApiErrorToast } = useErrorHandling();
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

export default Bikes;
