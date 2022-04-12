import { useMutation, useQueryClient } from 'react-query';
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

import { cancelReservation, queryKeys } from '../../api/reservations';
import { useErrorHandling, useSuccessToast } from '../../hooks';
import { AlertTriangleIcon } from '../../components/icons';
import { Reservation } from '../../interfaces';
import { formatDate } from '../../utilities';

interface CancelReservationProps {
	reservation: Reservation;
	onClose: () => void;
}

const CancelReservation = ({
	reservation,
	onClose,
}: CancelReservationProps) => {
	const { renderApiSuccessToast } = useSuccessToast();
	const { renderApiErrorToast } = useErrorHandling();
	const queryClient = useQueryClient();

	const cancelReservationMutation = useMutation(
		() => cancelReservation(reservation.id),
		{
			onSuccess: (response) => {
				onClose();
				queryClient.invalidateQueries(queryKeys.fetchReservations);
				renderApiSuccessToast('Reservation has been removed successfully')(
					response
				);
			},
			onError: renderApiErrorToast('Could not remove reservation'),
		}
	);

	return (
		<Modal isOpen={true} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader fontSize="md">
					Cancel {reservation.bike.model} reservation?
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody textAlign="center">
					<AlertTriangleIcon mt="4" color="red.400" h={8} w={8} />
					<Text my="6">
						Are you sure you want to cancel the {reservation.bike.model} bike
						reservation set from {formatDate(reservation.from)} to{' '}
						{formatDate(reservation.to)}?
					</Text>
				</ModalBody>
				<ModalFooter display="flex" justifyContent="space-between">
					<Button onClick={onClose}>Cancel</Button>
					<Button
						colorScheme="red"
						isLoading={cancelReservationMutation.isLoading}
						onClick={() => cancelReservationMutation.mutate()}
					>
						Confirm
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
export default CancelReservation;
