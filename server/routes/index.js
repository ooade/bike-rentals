const multer = require('multer');
const { authPolicy } = require('../policy');
const { uploadMedia, deleteMedia } = require('./upload');
const {
	login,
	addUser,
	register,
	getUsers,
	getSession,
	deleteUser,
	updateUser,
} = require('./auth');

const upload = multer({ storage: multer.diskStorage({}) });

module.exports = (app) => {
	const isAuthAndCanManageUsers = [
		authPolicy.onlyAuthUsers,
		authPolicy.canManageUsers,
	];

	/**
	 * @UserRoutes
	 * Routes related to users
	 */
	app.post('/login', login);
	app.post('/register', register);
	app.post('/users', [...isAuthAndCanManageUsers], addUser);
	app.get('/session', authPolicy.onlyAuthUsers, getSession);
	app.get('/users', [...isAuthAndCanManageUsers], getUsers);
	app.patch('/users/:id', [...isAuthAndCanManageUsers], updateUser);
	app.delete('/users/:id', [...isAuthAndCanManageUsers], deleteUser);

	/**
	 * @FileUploadRoutes
	 * Routes related to file updload
	 */
	app.post(
		'/media',
		[...isAuthAndCanManageUsers],
		upload.single('file'),
		uploadMedia
	);
	app.delete('/media/:public_id', [...isAuthAndCanManageUsers], deleteMedia);
};
