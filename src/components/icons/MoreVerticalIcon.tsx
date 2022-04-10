import { Icon, IconProps } from '@chakra-ui/react';

export const MoreVerticalIcon = (props: IconProps) => {
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
			<circle cx="12" cy="12" r="1" />
			<circle cx="12" cy="5" r="1" />
			<circle cx="12" cy="19" r="1" />
		</Icon>
	);
};
