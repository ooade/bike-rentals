import { Icon, IconProps } from '@chakra-ui/react';

export const ChevronRight = (props: IconProps) => {
	return (
		<Icon
			fill="none"
			strokeWidth="2"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}
		>
			<polyline points="9 18 15 12 9 6"></polyline>
		</Icon>
	);
};
