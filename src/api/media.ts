import api from '.';
import { APISuccessResponse, Cloudinary } from '../interfaces';

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
