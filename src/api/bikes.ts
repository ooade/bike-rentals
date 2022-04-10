import api from '.';
import { APISuccessResponse, Bike } from '../interfaces';

export const addBike = (
	payload: Partial<Bike>
): Promise<APISuccessResponse<Bike>> => {
	return api.post('bikes', payload);
};

export const fetchBikes = (): Promise<APISuccessResponse<Bike[]>> => {
	return api.get('bikes');
};

export const updateBike = ({
	id,
	...payload
}: Partial<Bike>): Promise<APISuccessResponse<Bike>> => {
	return api.patch(`bikes/${id}`, payload);
};

export const removeBike = ({
	id,
}: {
	id: string;
}): Promise<APISuccessResponse> => {
	return api.delete(`bikes/${id}`);
};

export const queryKeys = {
	fetchBikes: 'bikes',
};
