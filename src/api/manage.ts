import api from '.';
import { APISuccessResponse, Cloudinary, User } from '../interfaces';

export const fetchUsers = (): Promise<APISuccessResponse<User[]>> => {
	return api.get('users');
};

export const addUser = (
	payload: Partial<User>
): Promise<APISuccessResponse<User>> => {
	return api.post('users', payload);
};

export const updateUser = ({
	id,
	...payload
}: Partial<User>): Promise<APISuccessResponse<User>> => {
	return api.patch(`users/${id}`, payload);
};

export const removeUser = ({
	id,
}: {
	id: string;
}): Promise<APISuccessResponse> => {
	return api.delete(`users/${id}`);
};

export const uploadMedia = (
	file: File
): Promise<APISuccessResponse<Cloudinary>> => {
	const formData = new FormData();
	formData.append('file', file);
	return api.post('media', formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
};

export const queryKeys = {
	users: 'users',
};
