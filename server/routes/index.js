const multer = require('multer');
const { uploadMedia, deleteMedia } = require('./upload');
const { reserveBike, listReservations } = require('./reservation');
const {
	addBike,
	rateBike,
	getBikes,
	deleteBike,
	updateBike,
} = require('./bike');
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
	/**
	 * @UserRoutes
	 * Routes related to users
	 */
	app.post('/login', login);
	app.post('/register', register);
	app.get('/session', isAuthenticated, getSession);
	app.post('/users', isAuthenticated, canModerateApp, addUser);
	app.get('/users', isAuthenticated, canModerateApp, getUsers);
	app.patch('/users/:id', isAuthenticated, canModerateApp, updateUser);
	app.delete('/users/:id', isAuthenticated, canModerateApp, deleteUser);

	/**
	 * @FileUploadRoutes
	 * Routes related to file upload
	 */
	app.post(
		'/media',
		isAuthenticated,
		canModerateApp,
		upload.single('file'),
		uploadMedia
	);
	app.delete('/media/:id', isAuthenticated, canModerateApp, deleteMedia);

	/**
	 * @BikeRoutes
	 * Routes related to bike
	 */
	app.get('/bikes', isAuthenticated, getBikes);
	app.post('/bikes', isAuthenticated, canModerateApp, addBike);
	app.post('/bikes/:bike_id/review', isAuthenticated, rateBike);
	app.patch('/bikes/:id', isAuthenticated, canModerateApp, updateBike);
	app.delete('/bikes/:id', isAuthenticated, canModerateApp, deleteBike);

	/**
	 * @BikeReservationRoutes
	 * Routes related to bike reservations
	 */
	app.post('/bikes/:bike_id/reserve', isAuthenticated, reserveBike);
	app.get('/reservations', isAuthenticated, canModerateApp, listReservations);
};
