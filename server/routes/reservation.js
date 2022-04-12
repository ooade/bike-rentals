const { Reservation, Bike } = require('../db');
const { STATUS_CODES } = require('../constants');
const { handleErrorResponse, handleSuccessResponse } = require('../utils');

const reserveBike = async (req, res) => {
	const { from, to } = req.body;
	const { bike_id } = req.params;
	const { id: created_by } = req.user;

	const reserveBikeErrorMessage = 'Failed to reserve bike';

	try {
		const foundBike = await Bike.findById(bike_id);

		if (!foundBike) {
			return res.status(STATUS_CODES.notFound).json(
				handleErrorResponse({
					message: reserveBikeErrorMessage,
					error: 'Bike not found or no longer exists',
				})
			);
		}

		const foundReservations = await Reservation.find({
			bike: bike_id,
			$or: [
				{
					$and: [
						{ from: { $lte: new Date(from) } },
						{ to: { $gte: new Date(to) } },
					],
				},
				{
					$and: [
						{ from: { $lte: new Date(to) } },
						{ to: { $gte: new Date(from) } },
					],
				},
			],
		});

		if (foundReservations.length > 0) {
			return res.status(STATUS_CODES.conflict).json(
				handleErrorResponse({
					message: reserveBikeErrorMessage,
					error: 'Bike already reserved for this time period',
				})
			);
		}

		const reservation = await new Reservation({
			to,
			from,
			created_by,
			bike: bike_id,
		});
		await reservation.save();

		return res.status(STATUS_CODES.created).json(
			handleSuccessResponse({
				message: 'Bike reserved successfully',
				data: reservation,
			})
		);
	} catch (error) {
		return res
			.status(STATUS_CODES.serverError)
			.json(handleErrorResponse({ message: reserveBikeErrorMessage, error }));
	}
};

const listReservations = async (req, res) => {
	const { id: created_by } = req.user;

	try {
		const reservations = await Reservation.find({ created_by })
			.populate('bike')
			.populate('created_by');

		return res.status(STATUS_CODES.ok).json(
			handleSuccessResponse({
				message: 'Reservations retrieved successfully',
				data: reservations,
			})
		);
	} catch (error) {
		return res.status(STATUS_CODES.serverError).json(
			handleErrorResponse({
				message: 'Failed to retreive reservations',
				error,
			})
		);
	}
};

const listReservationUsers = async (req, res) => {
	try {
		const reservations = await Reservation.aggregate([
			{
				$group: {
					_id: '$created_by',
					created_by: {
						$first: '$created_by',
					},
					from: {
						$first: '$from',
					},
					to: {
						$first: '$to',
					},
					reservation_id: {
						$first: '$_id',
					},
				},
			},
			{
				$lookup: {
					from: 'users',
					localField: 'created_by',
					foreignField: '_id',
					as: 'created_by',
				},
			},
			{ $unwind: { path: '$created_by' } },
			{
				$project: {
					id: '$_id',
					email: '$created_by.email',
					reservation_id: 1,
					from: 1,
					to: 1,
					_id: 0,
				},
			},
			{ $sort: { id: 1 } },
		]);

		return res.status(STATUS_CODES.ok).json(
			handleSuccessResponse({
				message: 'Reservations retrieved successfully',
				data: reservations,
			})
		);
	} catch (error) {
		return res.status(STATUS_CODES.serverError).json(
			handleErrorResponse({
				message: 'Failed to retreive reservations',
				error,
			})
		);
	}
};

const deleteReservation = async (req, res) => {
	const { reservation_id } = req.params;
	const { id: created_by } = req.user;

	try {
		const reservation = await Reservation.findOneAndDelete({
			_id: reservation_id,
			created_by,
		});

		return res.status(STATUS_CODES.ok).json(
			handleSuccessResponse({
				message: 'Reservation deleted successfully',
				data: reservation,
			})
		);
	} catch (error) {
		return res.status(STATUS_CODES.serverError).json(
			handleErrorResponse({
				message: 'Failed to delete reservation',
				error,
			})
		);
	}
};

const listUserReservations = async (req, res) => {
	const { user_id } = req.params;

	try {
		const reservation = await Reservation.find({ created_by: user_id })
			.populate('bike')
			.populate('created_by');

		return res.status(STATUS_CODES.ok).json(
			handleSuccessResponse({
				message: 'User reservations retrieved successfully',
				data: reservation,
			})
		);
	} catch (error) {
		return res.status(STATUS_CODES.serverError).json(
			handleErrorResponse({
				message: 'Failed to retreive user reservations',
				error,
			})
		);
	}
};

module.exports = {
	reserveBike,
	listReservations,
	deleteReservation,
	listReservationUsers,
	listUserReservations,
};
