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

export const queryKeys = {
	session: 'session',
};
