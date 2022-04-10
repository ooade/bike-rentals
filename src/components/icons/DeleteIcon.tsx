import { Icon, IconProps } from '@chakra-ui/react';

export const DeleteIcon = (props: IconProps) => {
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
			<polyline points="3 6 5 6 21 6"></polyline>
			<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
		</Icon>
	);
};
