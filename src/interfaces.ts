type Role = 'user' | 'manager';

interface CommonApiData {
	createdAt: string;
	updatedAt: string;
}

export interface APISuccessResponse<T = undefined> {
	status: true;
	message: string;
	data: T;
}

export interface APIErrorResponse {
	status: false;
	error: string;
	message: string;
	status_code: number;
}

export interface User extends CommonApiData {
	id: string;
	role: Role;
	email: string;
	token?: string;
	fullname: string;
	password?: string;
}

export interface Cloudinary {
	public_id: string;
	secure_url: string;
}

export interface Bike extends CommonApiData {
	id: string;
	model: string;
	color: string;
	location: string;
	image: Cloudinary;
}
