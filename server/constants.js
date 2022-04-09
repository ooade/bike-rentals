const USER_ROLES = ['user', 'manager'];

const STATUS_CODES = {
	ok: 200,
	created: 201,
	badRequest: 400,
	unauthorized: 401,
	notFound: 404,
	serverError: 500,
};

module.exports = {
	USER_ROLES,
	STATUS_CODES,
};
