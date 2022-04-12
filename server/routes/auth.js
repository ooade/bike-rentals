const { User } = require('../db');
const { STATUS_CODES } = require('../constants');
const { handleErrorResponse, handleSuccessResponse } = require('../utils');

const register = async (req, res) => {
	const { email, password } = req.body;

	const registrationErrorMessage = 'Could not register user';
	const { error } = User.validateAuth({ email, password });

	if (error) {
		return res.status(STATUS_CODES.badRequest).json(
			handleErrorResponse({
				message: registrationErrorMessage,
				error,
			})
		);
	}

	try {
		const user = new User({ email });
		await User.register(user, password);
		const token = User.getToken({ user });

		const { hash, salt, ...userRecord } = user.toJSON();
		const data = { ...userRecord, token };

		return res.status(STATUS_CODES.created).json(
			handleSuccessResponse({
				message: 'User registered successfully',
				data,
			})
		);
	} catch (error) {
		return res.status(STATUS_CODES.serverError).json(
			handleErrorResponse({
				message: registrationErrorMessage,
				error,
			})
		);
	}
};

const login = async (req, res) => {
	const { email, password } = req.body;

	const loginErrorMessage = 'Could not login user';
	const validation = User.validateAuth({ email, password });

	if (validation.error) {
		return res.status(STATUS_CODES.badRequest).json(
			handleErrorResponse({
				message: loginErrorMessage,
				error: validation.error,
			})
		);
	}

	const { user, error } = await User.authenticate()(email, password);

	if (user) {
		try {
			const token = User.getToken({ user });
			const { hash, salt, ...userRecord } = user.toJSON();
			const data = { ...userRecord, token };

			return res.status(STATUS_CODES.ok).json(
				handleSuccessResponse({
					message: 'User logged in successfully',
					data,
				})
			);
		} catch (error) {
			throw new Error(error);
		}
	}

	return res.status(STATUS_CODES.unauthorized).json(
		handleErrorResponse({
			message: loginErrorMessage,
			error,
		})
	);
};

const getSession = (req, res) => {
	try {
		const data = req.user.toJSON();
		return res
			.status(STATUS_CODES.ok)
			.json(handleSuccessResponse({ message: 'Session retrieved', data }));
	} catch (error) {
		return res.status(STATUS_CODES.serverError).json(
			handleErrorResponse({
				message: 'Session could not be retrieved',
				error,
			})
		);
	}
};

const getUsers = async (req, res) => {
	try {
		const users = await User.find();
		return res.status(STATUS_CODES.ok).json(
			handleSuccessResponse({
				message: 'Users retrieved successfully',
				data: users,
			})
		);
	} catch (error) {
		return res
			.status(STATUS_CODES.serverError)
			.json(
				handleErrorResponse({ message: 'Failed to retrieve users', error })
			);
	}
};

const addUser = async (req, res) => {
	const { email, role, fullname, password } = req.body;
	const addUserErrorMessage = 'Failed to add user';

	const { error } = User.validateAddUser({ email, password, role });

	if (error) {
		return res.status(STATUS_CODES.badRequest).json(
			handleErrorResponse({
				message: addUserErrorMessage,
				error,
			})
		);
	}

	try {
		const user = new User({ email, role, fullname, password });
		await User.register(user, password);

		return res.status(STATUS_CODES.created).json(
			handleSuccessResponse({
				message: 'User added successfully',
				data: user,
			})
		);
	} catch (error) {
		return res
			.status(STATUS_CODES.serverError)
			.json(handleErrorResponse({ message: addUserErrorMessage, error }));
	}
};

const deleteUser = async (req, res) => {
	const { id } = req.params;

	try {
		await User.findByIdAndRemove(id);

		return res.status(STATUS_CODES.ok).json(
			handleSuccessResponse({
				message: 'User removed successfully',
				data: null,
			})
		);
	} catch (error) {
		return res
			.status(STATUS_CODES.serverError)
			.json(handleErrorResponse({ message: 'Failed to remove user', error }));
	}
};

const updateUser = async (req, res) => {
	const { id } = req.params;
	const { email, fullname, role } = req.body;

	const updateUserErrorMessage = 'Failed to update user';
	const { error } = User.validateUpdateUser({ email, role });

	if (error) {
		return res.status(STATUS_CODES.badRequest).json(
			handleErrorResponse({
				message: updateUserErrorMessage,
				error,
			})
		);
	}

	try {
		const user = await User.findByIdAndUpdate(
			id,
			{ email, fullname, role },
			{ new: true }
		);

		return res.status(STATUS_CODES.ok).json(
			handleSuccessResponse({
				message: 'User updated successfully',
				data: user,
			})
		);
	} catch (error) {
		return res
			.status(STATUS_CODES.serverError)
			.json(handleErrorResponse({ message: updateUserErrorMessage, error }));
	}
};

module.exports = {
	login,
	addUser,
	getUsers,
	register,
	updateUser,
	getSession,
	deleteUser,
};
