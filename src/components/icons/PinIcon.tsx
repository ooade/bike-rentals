import { Icon, IconProps } from '@chakra-ui/react';

export const PinIcon = (props: IconProps) => {
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
			<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
			<circle cx="12" cy="10" r="3"></circle>
		</Icon>
	);
};
