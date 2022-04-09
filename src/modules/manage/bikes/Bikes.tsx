import { useState } from 'react';
import { Box, Button } from '@chakra-ui/react';
// import { useCurrentUser, useErrorHandling } from '../../../hooks';
import AddBikeModal from './AddBikeModal';

const modals = {
	addBike: 'addBike',
	editUser: 'editBike',
	removeBike: 'removeBike',
} as const;

const initialActiveModalState = {
	modal: null,
	bikeId: null,
};

type ActiveModalState = {
	modal: keyof typeof modals | null;
	bikeId?: string | null;
};

export const ManageBikes = () => {
	// const { data: currentUser } = useCurrentUser();
	// const { renderApiErrorToast } = useErrorHandling();
	const [activeModalState, setActiveModalState] = useState<ActiveModalState>(
		initialActiveModalState
	);

	const handleModalClose = () => setActiveModalState(initialActiveModalState);

	return (
		<Box my="10">
			{activeModalState.modal === 'addBike' && (
				<AddBikeModal onClose={handleModalClose} />
			)}
			<Button ml="6" onClick={() => setActiveModalState({ modal: 'addBike' })}>
				Add new bike
			</Button>
		</Box>
	);
};
