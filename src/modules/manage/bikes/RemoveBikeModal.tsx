import {
	Text,
	Modal,
	Button,
	ModalBody,
	ModalHeader,
	ModalFooter,
	ModalContent,
	ModalOverlay,
	ModalCloseButton,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from 'react-query';

import { queryKeys, removeBike } from '../../../api/bikes';
import { AlertTriangleIcon } from '../../../components/icons';
import { useErrorHandling, useSuccessToast } from '../../../hooks';

interface RemoveBikeModalProps {
	bikeId: string;
	bikeModel: string;
	onClose: () => void;
	numberOfReservations: number;
}

const RemoveBikeModal = ({
	bikeId,
	onClose,
	bikeModel,
	numberOfReservations,
}: RemoveBikeModalProps) => {
	const queryClient = useQueryClient();
	const { renderApiErrorToast } = useErrorHandling();
	const { renderApiSuccessToast } = useSuccessToast();

	const removeBikeMutation = useMutation(() => removeBike({ id: bikeId }), {
		onError: renderApiErrorToast('Could not delete bike'),
		onSuccess: (response) => {
			onClose();
			queryClient.invalidateQueries(queryKeys.fetchBikes);
			renderApiSuccessToast('Bike deleted successfully')(response);
		},
	});

	return (
		<Modal isOpen={true} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader fontSize="md">Remove bike?</ModalHeader>
				<ModalCloseButton />
				<ModalBody textAlign="center">
					<AlertTriangleIcon mt="4" color="red.400" h={8} w={8} />
					<Text my="6">
						Are you sure you want to remove the {bikeModel} bike
						<b>
							{!!numberOfReservations &&
								` with its ${numberOfReservations} reservations`}
						</b>
						?
					</Text>
				</ModalBody>
				<ModalFooter display="flex" justifyContent="space-between">
					<Button onClick={onClose}>Cancel</Button>
					<Button
						colorScheme="red"
						isLoading={removeBikeMutation.isLoading}
						onClick={() => removeBikeMutation.mutate()}
					>
						Remove
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default RemoveBikeModal;
