const passport = require('passport');
const { STATUS_CODES } = require('../constants');
const { handleErrorResponse } = require('../utils');

const onlyAuthUsers = passport.authenticate('jwt');

const canManageUsers = (req, res, next) => {
	const user = req.user;

	if (user.role === 'manager') {
		return next();
	}

	return res
		.status(STATUS_CODES.unauthorized)
		.json(handleErrorResponse({ error: 'Unauthorized' }));
};

module.exports = { onlyAuthUsers, canManageUsers };
