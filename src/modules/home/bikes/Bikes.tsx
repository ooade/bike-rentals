import qs from 'qs';
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
		isError,
		isLoading,
		isSuccess,
	} = useQuery(
		[queryKeys.fetchBikes, searchParams.toString()],
		() => fetchBikes(qs.parse(searchParams.toString())),
		{
			select: ({ data }) => data,
			onError: renderApiErrorToast('Could not fetch bikes'),
		}
	);

	if (isLoading) return <ContentLoader />;

	if ((isSuccess && bikes.length === 0) || isError) {
		return <NoData title="Sorry, we couldn't fetch bikes" />;
	}

	return (
		<Box py="3" height="calc(100vh - 150px)" overflowY="auto">
			<Flex flexWrap="wrap" data-testid="bikes">
				{bikes.map((bike, index) => (
					<Bike key={bike.id} bike={bike} data-testid={`bike-${index}`} />
				))}
			</Flex>
		</Box>
	);
};

export default Bikes;
