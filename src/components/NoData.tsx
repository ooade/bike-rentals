import { Box, Text } from '@chakra-ui/react';

interface NoDataProps {
	title: string;
	content?: string;
}

export const NoData = ({ title, content }: NoDataProps) => {
	return (
		<Box textAlign="center" my="3">
			<Text size="lg" fontWeight="600">
				{title}
			</Text>
			{!!content && <Text mt="1">{content}</Text>}
		</Box>
	);
};
