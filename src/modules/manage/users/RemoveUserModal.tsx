import {
	Text,
	Modal,
	Button,
	ModalBody,
	ModalHeader,
	ModalFooter,
	ModalOverlay,
	ModalContent,
	ModalCloseButton,
} from '@chakra-ui/react';
import { WarningIcon } from '@chakra-ui/icons';
import { useMutation, useQueryClient } from 'react-query';

import { User } from '../../../interfaces';
import { queryKeys, removeUser } from '../../../api/manage';
import { useErrorHandling, useSuccessToast } from '../../../hooks';

interface RemoveUserModalProps {
	onClose: () => void;
	user: User;
}

const RemoveUserModal = ({ user, onClose }: RemoveUserModalProps) => {
	const queryClient = useQueryClient();
	const { renderApiErrorToast } = useErrorHandling();
	const { renderApiSuccessToast } = useSuccessToast();

	const removeUserMutation = useMutation(() => removeUser({ id: user.id }), {
		onError: renderApiErrorToast('Could not delete user'),
		onSuccess: (response) => {
			queryClient.invalidateQueries(queryKeys.users);
			renderApiSuccessToast('User deleted successfully')(response);
		},
	});

	return (
		<Modal isOpen={true} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader fontSize="md">Remove user</ModalHeader>
				<ModalCloseButton />
				<ModalBody textAlign="center">
					<WarningIcon mt="4" color="red.400" h={8} w={8} />
					<Text my="6">Are you sure you want to remove {user.email}?</Text>
				</ModalBody>
				<ModalFooter display="flex" justifyContent="space-between">
					<Button onClick={onClose}>Cancel</Button>
					<Button
						colorScheme="red"
						isLoading={removeUserMutation.isLoading}
						onClick={() => removeUserMutation.mutate()}
					>
						Remove
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default RemoveUserModal;
