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

import { User } from '../../../interfaces';
import { addUserSchema } from '../../../schemas';
import { queryKeys, addUser } from '../../../api/manage';
import { useErrorHandling, useSuccessToast } from '../../../hooks';

interface AddUserModalProps {
	onClose: () => void;
}

const AddUserModal = ({ onClose }: AddUserModalProps) => {
	const { renderApiErrorToast } = useErrorHandling();
	const { renderApiSuccessToast } = useSuccessToast();
	const queryClient = useQueryClient();

	const addUserMutation = useMutation(
		(payload: Partial<User>) => addUser(payload),
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
		email: '',
		fullname: '',
		password: '',
		role: 'user',
	};

	const addUserModalForm = useFormik({
		initialValues: addUserModalInitialValues,
		validationSchema: addUserSchema,
		onSubmit: (payload) => {
			addUserMutation.mutate(payload);
		},
	});

	return (
		<Modal isOpen={true} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<form onSubmit={addUserModalForm.handleSubmit}>
					<ModalHeader fontSize="md">Add user</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<FormControl mb="2" isRequired>
							<FormLabel htmlFor="email">Email address</FormLabel>
							<Input
								type="email"
								id="email"
								{...addUserModalForm.getFieldProps('email')}
							/>
						</FormControl>
						<FormControl mb="2" isRequired>
							<FormLabel htmlFor="password">Password</FormLabel>
							<Input
								type="password"
								id="password"
								{...addUserModalForm.getFieldProps('password')}
							/>
						</FormControl>
						<FormControl mb="2">
							<FormLabel htmlFor="fullname">Fullname</FormLabel>
							<Input
								id="fullname"
								{...addUserModalForm.getFieldProps('fullname')}
							/>
						</FormControl>
						<FormControl mb="2">
							<FormLabel htmlFor="role">Role</FormLabel>
							<Select id="role" {...addUserModalForm.getFieldProps('role')}>
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
							isLoading={addUserMutation.isLoading}
							isDisabled={addUserModalForm.dirty && !addUserModalForm.isValid}
						>
							Submit
						</Button>
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
	);
};

export default AddUserModal;
