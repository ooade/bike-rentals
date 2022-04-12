import { useQuery } from 'react-query';
import { Box, Flex } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';

import Bike from './Bike';
import { useErrorHandling } from '../../../hooks';
import { ContentLoader, NoData } from '../../../components';
import { fetchBikes, queryKeys } from '../../../api/bikes';

export const Bikes = () => {
	const { renderApiErrorToast } = useErrorHandling();
	const [searchParams] = useSearchParams();

	const {
		data: bikes = [],
		isLoading,
		isSuccess,
	} = useQuery(
		[queryKeys.fetchBikes, searchParams.toString()],
		() => fetchBikes(searchParams.toString()),
		{
			select: ({ data }) => data,
			onError: renderApiErrorToast('Could not fetch bikes'),
		}
	);

	if (isLoading) return <ContentLoader />;

	if (isSuccess && bikes.length === 0) {
		return (
			<NoData
				title="Sorry, we couldn't fetch bikes"
				content="Try applying a different filter"
			/>
		);
	}

	return (
		<Box py="3" height="calc(100vh - 150px)" overflowY="auto">
			<Flex flexWrap="wrap">
				{bikes.map((bike) => (
					<Bike key={bike.id} bike={bike} />
				))}
			</Flex>
		</Box>
	);
};

export default Bikes;
