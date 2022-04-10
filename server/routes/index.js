const multer = require('multer');
const { uploadMedia, deleteMedia } = require('./upload');
const { addBike, getBikes, updateBike, deleteBike } = require('./bike');
const {
	login,
	addUser,
	register,
	getUsers,
	getSession,
	deleteUser,
	updateUser,
} = require('./auth');

const { isAuthenticated, canModerateApp } = require('../policy/auth');

const upload = multer({ storage: multer.diskStorage({}) });

module.exports = (app) => {
	const isAuthenticatedAndCanModerateApp = [isAuthenticated, canModerateApp];

	/**
	 * @UserRoutes
	 * Routes related to users
	 */
	app.post('/login', login);
	app.post('/register', register);
	app.get('/session', isAuthenticated, getSession);
	app.post('/users', [...isAuthenticatedAndCanModerateApp], addUser);
	app.get('/users', [...isAuthenticatedAndCanModerateApp], getUsers);
	app.patch('/users/:id', [...isAuthenticatedAndCanModerateApp], updateUser);
	app.delete('/users/:id', [...isAuthenticatedAndCanModerateApp], deleteUser);

	/**
	 * @FileUploadRoutes
	 * Routes related to file upload
	 */
	app.post(
		'/media',
		[...isAuthenticatedAndCanModerateApp],
		upload.single('file'),
		uploadMedia
	);
	app.delete('/media/:id', [...isAuthenticatedAndCanModerateApp], deleteMedia);

	/**
	 * @BikeRoutes
	 * Routes related to bike
	 */
	app.get('/bikes', isAuthenticated, getBikes);
	app.post('/bikes', [...isAuthenticatedAndCanModerateApp], addBike);
	app.patch('/bikes/:id', [...isAuthenticatedAndCanModerateApp], updateBike);
	app.delete('/bikes/:id', [...isAuthenticatedAndCanModerateApp], deleteBike);
};
