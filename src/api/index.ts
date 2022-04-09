import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const api = axios.create({ baseURL: API_URL });

api.interceptors.response.use(
	(response) => response.data,
	(error) => {
		const errorResponseStatusCode = error.response?.status || 500;
		const errorResponseData = error.response?.data || {
			message: 'Server Error',
		};

		if (error.response?.headers['content-type']?.includes('text/html')) {
			return Promise.reject({
				message: 'Server Error',
				status_code: errorResponseStatusCode,
			});
		}

		if (errorResponseData && typeof errorResponseData === 'object') {
			return Promise.reject({
				...errorResponseData,
				status_code: errorResponseStatusCode,
			});
		}

		if (typeof errorResponseData === 'string') {
			return Promise.reject({
				message: errorResponseData,
				status_code: errorResponseStatusCode,
			});
		}

		return Promise.reject(errorResponseData);
	}
);

export const getTokenAndUpdateHeaders = () => {
	const token = window.localStorage.getItem('token');

	if (token) {
		api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	}
};

getTokenAndUpdateHeaders();
export default api;
