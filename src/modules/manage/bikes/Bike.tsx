import { useState } from 'react';
import {
	Box,
	Menu,
	Image,
	MenuItem,
	MenuList,
	IconButton,
	MenuButton,
} from '@chakra-ui/react';

import EditBikeModal from './EditBikeModal';
import RemoveBikeModal from './RemoveBikeModal';
import {
	PinIcon,
	EditIcon,
	DeleteIcon,
	MoreVerticalIcon,
} from '../../../components/icons';
import { Bike as BikeInterface } from '../../../interfaces';
import { formatCloudinaryImageUrl } from '../../../utilities';

interface BikeProps {
	bike: BikeInterface;
}

const Bike = ({ bike }: BikeProps) => {
	const [openedModal, setOpenedModal] = useState('');
	const onModalClose = () => setOpenedModal('');

	const formattedBikeImageUrl = formatCloudinaryImageUrl(
		bike.image.secure_url,
		'c_scale,w_500,fl_progressive'
	);

	return (
		<>
			{openedModal === 'edit' && (
				<EditBikeModal
					bike={bike}
					onClose={onModalClose}
					formattedBikeImageUrl={formattedBikeImageUrl}
				/>
			)}
			{openedModal === 'remove' && (
				<RemoveBikeModal
					bikeId={bike.id}
					bikeModel={bike.model}
					onClose={onModalClose}
				/>
			)}
			<Box
				mb="3"
				key={bike.id}
				borderRadius="10px"
				position="relative"
				display="inline-block"
				border="1px solid"
				borderColor="gray.100"
				transition="all 0.2s ease"
			>
				<Box
					height="20px"
					width="100%"
					bg={bike.color}
					borderRadius="10px 10px 0px 0px"
				/>
				<Menu placement="bottom-end">
					<MenuButton
						top="30px"
						right="10px"
						as={IconButton}
						borderRadius="3xl"
						position="absolute"
						aria-label="Open menu"
						icon={<MoreVerticalIcon />}
					></MenuButton>
					<MenuList minWidth="60px">
						<MenuItem
							icon={<EditIcon />}
							onClick={() => setOpenedModal('edit')}
						>
							Edit
						</MenuItem>
						<MenuItem
							icon={<DeleteIcon />}
							onClick={() => setOpenedModal('remove')}
						>
							Remove
						</MenuItem>
					</MenuList>
				</Menu>
				<div>
					<Image
						minWidth="400px"
						minHeight="400px"
						objectFit="cover"
						alt={`${bike.model} bike`}
						src={formattedBikeImageUrl}
					/>
				</div>
				<Box p="3" display="flex" justifyContent="space-between">
					<div>{bike.model}</div>
					<Box display="flex" alignItems="center">
						<PinIcon />
						{bike.location}
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default Bike;
