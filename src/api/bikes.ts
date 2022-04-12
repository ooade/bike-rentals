import api from '.';
import { APISuccessResponse, Bike } from '../interfaces';

export const addBike = (
	payload: Partial<Bike>
): Promise<APISuccessResponse<Bike>> => {
	return api.post('bikes', payload);
};

export const fetchBikes = (
	serializedParams?: string
): Promise<APISuccessResponse<Bike[]>> => {
	return api.get(`bikes?${serializedParams || ''}`);
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

type RateBikeQueryParams = {
	id: string;
	rate: number;
};

export const rateBike = ({ id, rate }: RateBikeQueryParams) => {
	return api.post(`bikes/${id}/review`, { rate });
};

export const queryKeys = {
	fetchBikes: 'bikes',
};
