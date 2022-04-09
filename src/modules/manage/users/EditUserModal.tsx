import {
	Modal,
	Input,
	Button,
	Select,
	ModalBody,
	FormLabel,
	ModalHeader,
	ModalFooter,
	ModalOverlay,
	ModalContent,
	FormControl,
	ModalCloseButton,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useMutation, useQueryClient } from 'react-query';
import { queryKeys, updateUser } from '../../../api/manage';
import {
	useCurrentUser,
	useErrorHandling,
	useSuccessToast,
} from '../../../hooks';

import { User } from '../../../interfaces';
import { editUserSchema } from '../../../schemas';

interface EditUserModalProps {
	user: User;
	onClose: () => void;
}

const EditUserModal = ({ user, onClose }: EditUserModalProps) => {
	const { renderApiErrorToast } = useErrorHandling();
	const { renderApiSuccessToast } = useSuccessToast();
	const { data: currentUser } = useCurrentUser();
	const queryClient = useQueryClient();

	const editUserMutation = useMutation(
		(payload: Partial<User>) => updateUser(payload),
		{
			onSuccess: (response) => {
				queryClient.invalidateQueries(queryKeys.users);
				renderApiSuccessToast('User added successfully')(response);
				onClose();
			},
			onError: renderApiErrorToast('Could not add user'),
		}
	);

	const addUserModalInitialValues: Partial<User> = {
		email: user.email || '',
		fullname: user.fullname || '',
		role: user.role || '',
	};

	const editUserModalForm = useFormik({
		initialValues: addUserModalInitialValues,
		validationSchema: editUserSchema,
		onSubmit: (payload) => {
			editUserMutation.mutate({ id: user.id, ...payload });
		},
	});

	return (
		<Modal isOpen={true} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<form onSubmit={editUserModalForm.handleSubmit}>
					<ModalHeader fontSize="md">Edit user</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<FormControl mb="2" isRequired>
							<FormLabel htmlFor="email">Email address</FormLabel>
							<Input
								type="email"
								id="email"
								{...editUserModalForm.getFieldProps('email')}
							/>
						</FormControl>
						<FormControl mb="2">
							<FormLabel htmlFor="fullname">Fullname</FormLabel>
							<Input
								id="fullname"
								{...editUserModalForm.getFieldProps('fullname')}
							/>
						</FormControl>
						<FormControl mb="2">
							<FormLabel htmlFor="role">Role</FormLabel>
							<Select
								id="role"
								isDisabled={currentUser?.id === user.id}
								{...editUserModalForm.getFieldProps('role')}
							>
								<option value="user">User</option>
								<option value="manager">Manager</option>
							</Select>
						</FormControl>
					</ModalBody>
					<ModalFooter display="flex" justifyContent="space-between">
						<Button onClick={onClose}>Cancel</Button>
						<Button
							type="submit"
							colorScheme="blue"
							isLoading={editUserMutation.isLoading}
							isDisabled={editUserModalForm.dirty && !editUserModalForm.isValid}
						>
							Submit
						</Button>
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
	);
};

export default EditUserModal;
