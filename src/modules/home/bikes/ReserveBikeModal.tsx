import {
	Modal,
	Input,
	Button,
	ModalBody,
	FormLabel,
	ModalHeader,
	ModalFooter,
	FormControl,
	ModalOverlay,
	ModalContent,
	ModalCloseButton,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useMutation, useQueryClient } from 'react-query';

import { getCurrentDateInDateInputFormat } from '../../../utilities';
import { useErrorHandling, useSuccessToast } from '../../../hooks';
import { reserveBike } from '../../../api/reservations';
import { Bike, Reservation } from '../../../interfaces';
import { reserveBikeSchema } from '../../../schemas';
import { queryKeys } from '../../../api/bikes';

interface AddBikeModalProps {
	bike: Bike;
	onClose: () => void;
}

const ReserveBikeModal = ({ bike, onClose }: AddBikeModalProps) => {
	const { renderApiSuccessToast } = useSuccessToast();
	const { renderApiErrorToast } = useErrorHandling();
	const queryClient = useQueryClient();

	const reserveBikeMutation = useMutation(
		(payload: Partial<Reservation>) =>
			reserveBike({ bikeId: bike.id, ...payload }),
		{
			onSuccess: (response) => {
				queryClient.invalidateQueries(queryKeys.fetchBikes);
				renderApiSuccessToast('Bike reserved successfully')(response);
				onClose();
			},
			onError: renderApiErrorToast('Could not reserve bike'),
		}
	);

	const initialReserveBikeModalValues = {
		from: '',
		to: '',
	};

	const reserveBikeModalForm = useFormik({
		initialValues: initialReserveBikeModalValues,
		validationSchema: reserveBikeSchema,
		onSubmit: (payload) => {
			reserveBikeMutation.mutate(payload);
		},
	});

	return (
		<Modal isOpen={true} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<form
					id="reserve-bike-form"
					onSubmit={reserveBikeModalForm.handleSubmit}
				>
					<ModalHeader fontSize="md">Reserve the {bike.model} bike</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<FormControl mb="2" isRequired>
							<FormLabel htmlFor="from">Reserve from</FormLabel>
							<Input
								id="from"
								type="date"
								min={getCurrentDateInDateInputFormat()}
								{...reserveBikeModalForm.getFieldProps('from')}
							/>
						</FormControl>
						<FormControl mb="2" isRequired>
							<FormLabel htmlFor="to">Reserve to</FormLabel>
							<Input
								id="to"
								type="date"
								min={reserveBikeModalForm.values.from}
								{...reserveBikeModalForm.getFieldProps('to')}
							/>
						</FormControl>
					</ModalBody>
					<ModalFooter display="flex" justifyContent="space-between">
						<Button onClick={onClose}>Cancel</Button>
						<Button
							type="submit"
							colorScheme="blue"
							isLoading={reserveBikeMutation.isLoading}
							isDisabled={
								reserveBikeModalForm.dirty && !reserveBikeModalForm.isValid
							}
						>
							Confirm
						</Button>
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
	);
};

export default ReserveBikeModal;
