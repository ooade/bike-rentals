import {
	Tr,
	Th,
	Td,
	Box,
	Thead,
	Tbody,
	Table,
	Button,
	TableContainer,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useQuery } from 'react-query';

import AddUserModal from './AddUserModal';
import EditUserModal from './EditUserModal';
import RemoveUserModal from './RemoveUserModal';

import { useCurrentUser, useErrorHandling } from '../../../hooks';
import { fetchUsers, queryKeys } from '../../../api/auth';
import { ContentLoader } from '../../../components';
import { formatDate } from '../../../utilities';

const modals = {
	addNewUser: 'addNewUser',
	removeUser: 'removeUser',
	editUser: 'editUser',
} as const;

const initialActiveModalState = {
	modal: null,
	userId: null,
};

type ActiveModalState = {
	modal: keyof typeof modals | null;
	userId?: string | null;
};

export const ManageUsers = () => {
	const { data: currentUser } = useCurrentUser();
	const { renderApiErrorToast } = useErrorHandling();
	const [activeModalState, setActiveModalState] = useState<ActiveModalState>(
		initialActiveModalState
	);

	const { data: users = [], isLoading } = useQuery(
		queryKeys.fetchUsers,
		() => fetchUsers(),
		{
			select: ({ data }) => data,
			onError: renderApiErrorToast('Could not fetch users'),
		}
	);

	if (isLoading) return <ContentLoader />;

	const handleModalClose = () => setActiveModalState(initialActiveModalState);
	const getUser = (userId: string) => users.find((user) => user.id === userId);
	const selectedModalUser = getUser(activeModalState.userId || '');

	return (
		<Box my="10">
			{activeModalState.modal === 'addNewUser' && (
				<AddUserModal onClose={handleModalClose} />
			)}
			{activeModalState.modal === 'editUser' && selectedModalUser && (
				<EditUserModal user={selectedModalUser} onClose={handleModalClose} />
			)}
			{activeModalState.modal === 'removeUser' && selectedModalUser && (
				<RemoveUserModal user={selectedModalUser} onClose={handleModalClose} />
			)}
			<Button
				ml="6"
				onClick={() => setActiveModalState({ modal: modals.addNewUser })}
			>
				Add new user
			</Button>
			<TableContainer mt="4">
				<Table>
					<Thead>
						<Tr>
							<Th>Email address</Th>
							<Th>Role</Th>
							<Th>Created Date</Th>
							<Th></Th>
						</Tr>
					</Thead>
					<Tbody>
						{users.map((user) => (
							<Tr key={user.id}>
								<Td>{user.email}</Td>
								<Td>{user.role}</Td>
								<Td>{formatDate(user.createdAt)}</Td>
								<Td>
									<Button
										onClick={() =>
											setActiveModalState({
												userId: user.id,
												modal: modals.editUser,
											})
										}
									>
										Edit
									</Button>

									{user.id !== currentUser?.id && (
										<Button
											ml="4"
											colorScheme="red"
											onClick={() =>
												setActiveModalState({
													userId: user.id,
													modal: modals.removeUser,
												})
											}
										>
											Remove
										</Button>
									)}
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>
		</Box>
	);
};
