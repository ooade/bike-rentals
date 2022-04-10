import { Icon, IconProps } from '@chakra-ui/react';

export const EditIcon = (props: IconProps) => {
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
			<path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
		</Icon>
	);
};
