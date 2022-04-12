type Role = 'user' | 'manager';

interface CommonApiData {
	id: string;
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

export interface Rating {
	id: string;
	rate: number;
	rated_by: string;
}

export interface Bike extends CommonApiData {
	model: string;
	color: string;
	location: string;
	image: Cloudinary;
	ratings: Rating[];
	reservations?: [];
	averageRate: number | null;
}

export interface Reservation extends CommonApiData {
	to: string;
	bike: Bike;
	from: string;
	created_by: User;
}

export interface ReservationUser {
	id: string;
	to: string;
	from: string;
	email: string;
}