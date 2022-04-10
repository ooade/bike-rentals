import api from '.';
import { APISuccessResponse, Reservation } from '../interfaces';

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

export const queryKeys = {
	fetchReservations: 'reservatiosn',
};
