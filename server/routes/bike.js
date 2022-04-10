const { Bike } = require('../db');
const { STATUS_CODES } = require('../constants');
const { handleErrorResponse, handleSuccessResponse } = require('../utils');

const addBike = async (req, res) => {
	const { model, color, image, location } = req.body;
	const { id: created_by } = req.user;

	try {
		const bike = await new Bike({ model, color, image, location, created_by });
		await bike.save();

		return res.status(STATUS_CODES.created).json(
			handleSuccessResponse({
				message: 'Bike added successfully',
				data: bike,
			})
		);
	} catch (error) {
		return res
			.status(STATUS_CODES.serverError)
			.json(handleErrorResponse({ message: 'Failed to add bike', error }));
	}
};

const getBikes = async (req, res) => {
	try {
		const bikes = await Bike.find();

		return res.status(STATUS_CODES.ok).json(
			handleSuccessResponse({
				message: 'Bikes retrieved successfully',
				data: bikes,
			})
		);
	} catch (error) {
		return res
			.status(STATUS_CODES.serverError)
			.json(
				handleErrorResponse({ message: 'Failed to retrieve bikes', error })
			);
	}
};

const deleteBike = async (req, res) => {
	const { id } = req.params;

	try {
		await Bike.findByIdAndRemove(id);

		return res.status(STATUS_CODES.ok).json(
			handleSuccessResponse({
				message: 'Bike removed successfully',
				data: null,
			})
		);
	} catch (error) {
		return res
			.status(STATUS_CODES.serverError)
			.json(handleErrorResponse({ message: 'Failed to remove bike', error }));
	}
};

const updateBike = async (req, res) => {
	const { id } = req.params;
	const { model, color, image, location } = req.body;

	try {
		const user = await Bike.findByIdAndUpdate(
			id,
			{ model, color, image, location },
			{ new: true }
		);

		return res.status(STATUS_CODES.ok).json(
			handleSuccessResponse({
				message: 'Bike updated successfully',
				data: user,
			})
		);
	} catch (error) {
		return res
			.status(STATUS_CODES.serverError)
			.json(handleErrorResponse({ message: 'Failed to update bike', error }));
	}
};

module.exports = {
	addBike,
	getBikes,
	updateBike,
	deleteBike,
};
