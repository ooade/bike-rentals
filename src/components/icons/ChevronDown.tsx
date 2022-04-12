import { Icon, IconProps } from '@chakra-ui/react';

export const ChevronDown = (props: IconProps) => {
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
			<polyline points="6 9 12 15 18 9"></polyline>
		</Icon>
	);
};
