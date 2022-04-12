const USER_ROLES = ['user', 'manager'];

const STATUS_CODES = {
	ok: 200,
	conflict: 409,
	created: 201,
	notFound: 404,
	badRequest: 400,
	serverError: 500,
	unauthorized: 401,
};

module.exports = {
	USER_ROLES,
	STATUS_CODES,
};
