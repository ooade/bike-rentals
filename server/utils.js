const __DEV__ = process.env.NODE_ENV !== 'production';

const handleSuccessResponse = ({ message = 'Successful!', data }) => {
	return {
		status: true,
		message,
		data,
	};
};

const handleErrorResponse = ({ message = 'Error Occurred!', error }) => {
	return {
		status: false,
		message,
		error: error && error.message ? error.message : error,
	};
};

module.exports = {
	__DEV__,
	handleErrorResponse,
	handleSuccessResponse,
};
