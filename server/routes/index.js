const multer = require('multer');
const { uploadMedia, deleteMedia } = require('./upload');
const {
	reserveBike,
	listReservations,
	deleteReservation,
	listUserReservations,
	listReservationUsers,
} = require('./reservation');
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
	app.post('/api/login', login);
	app.post('/api/register', register);
	app.get('/api/session', isAuthenticated, getSession);
	app.post('/api/users', isAuthenticated, canModerateApp, addUser);
	app.get('/api/users', isAuthenticated, canModerateApp, getUsers);
	app.patch('/api/users/:id', isAuthenticated, canModerateApp, updateUser);
	app.delete('/api/users/:id', isAuthenticated, canModerateApp, deleteUser);

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
	app.delete('/api/media/:id', isAuthenticated, canModerateApp, deleteMedia);

	/**
	 * @BikeRoutes
	 * Routes related to bike
	 */
	app.get('/api/bikes', isAuthenticated, getBikes);
	app.post('/api/bikes', isAuthenticated, canModerateApp, addBike);
	app.post('/api/bikes/:bike_id/review', isAuthenticated, rateBike);
	app.patch('/api/bikes/:id', isAuthenticated, canModerateApp, updateBike);
	app.delete('/api/bikes/:id', isAuthenticated, canModerateApp, deleteBike);

	/**
	 * @BikeReservationRoutes
	 * Routes related to bike reservations
	 */
	app.get(
		'/api/reservations/users',
		isAuthenticated,
		canModerateApp,
		listReservationUsers
	);
	app.get('/api/reservations', isAuthenticated, listReservations);
	app.post('/api/reservations/bikes/:bike_id', isAuthenticated, reserveBike);
	app.get(
		'/api/reservations/users/:user_id',
		isAuthenticated,
		canModerateApp,
		listUserReservations
	);
	app.delete(
		'/api/reservations/:reservation_id',
		isAuthenticated,
		deleteReservation
	);
};
