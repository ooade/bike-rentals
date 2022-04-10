import api from '.';
import { APISuccessResponse, User } from '../interfaces';

export type AuthPayload = {
	email: string;
	password: string;
};
export const login = (
	payload: AuthPayload
): Promise<APISuccessResponse<User>> => {
	return api.post('login', payload);
};

export const createAccount = (
	payload: AuthPayload
): Promise<APISuccessResponse<User>> => {
	return api.post('register', payload);
};

export const fetchCurrentUser = (): Promise<APISuccessResponse<User>> => {
	return api.get('session');
};

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

export const queryKeys = {
	fetchUsers: 'users',
	fetchCurrentUser: 'session',
};
