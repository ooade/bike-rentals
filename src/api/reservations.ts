import api from '.';
import {
	Reservation,
	ReservationUser,
	APISuccessResponse,
} from '../interfaces';

export const reserveBike = ({
	bikeId,
	...payload
}: Partial<Reservation> & { bikeId: string }): Promise<
	APISuccessResponse<Reservation>
> => {
	return api.post(`bikes/${bikeId}/reserve`, payload);
};

export const fetchReservations = (): Promise<
	APISuccessResponse<Reservation[]>
> => {
	return api.get('reservations');
};

export const fetchUserReservations = (
	id: string
): Promise<APISuccessResponse<Reservation[]>> => {
	return api.get(`reservations/users/${id}`);
};

export const fetchReservationUsers = (): Promise<
	APISuccessResponse<ReservationUser[]>
> => {
	return api.get('reservations/users');
};

export const fetchReservation = (
	id: string
): Promise<APISuccessResponse<Reservation>> => {
	return api.get(`reservations/${id}`);
};

export const cancelReservation = (
	reservationId: string
): Promise<APISuccessResponse> => {
	return api.delete(`reservations/${reservationId}`);
};

export const queryKeys = {
	fetchReservation: 'reservation',
	fetchReservations: 'reservations',
	fetchReservationUsers: 'reservationUsers',
	fetchUserReservations: 'userReservations',
};
