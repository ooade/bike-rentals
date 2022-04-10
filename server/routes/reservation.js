const { Reservation } = require('../db');
const { STATUS_CODES } = require('../constants');
const { handleErrorResponse, handleSuccessResponse } = require('../utils');

const reserveBike = async (req, res) => {
	const { from, to } = req.body;
	const { bike_id } = req.params;
	const { id: created_by } = req.user;

	try {
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
			.json(handleErrorResponse({ message: 'Failed to reserve bike', error }));
	}
};

const listReservations = async (req, res) => {
	try {
		const reservations = await Reservation.find()
			.populate('bike')
			.populate('created_by');

		return res.status(STATUS_CODES.created).json(
			handleSuccessResponse({
				message: 'Reservations retrieved successfully',
				data: reservations,
			})
		);
	} catch (error) {
		return res
			.status(STATUS_CODES.serverError)
			.json(handleErrorResponse({ message: 'Failed to retreive bike', error }));
	}
};

module.exports = {
	reserveBike,
	listReservations,
};
