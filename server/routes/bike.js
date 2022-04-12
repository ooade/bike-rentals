const { Bike } = require('../db');
const { STATUS_CODES } = require('../constants');
const { handleErrorResponse, handleSuccessResponse } = require('../utils');

const addBike = async (req, res) => {
	const { model, color, image, location } = req.body;
	const { id: created_by } = req.user;

	const addBikeErrorMessage = 'Failed to add bike';
	const { error } = Bike.validateManageBike({ model, color, image, location });

	if (error) {
		return res
			.status(STATUS_CODES.badRequest)
			.json(handleErrorResponse({ message: addBikeErrorMessage, error }));
	}

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
			.json(handleErrorResponse({ message: addBikeErrorMessage, error }));
	}
};

const getBikes = async (req, res) => {
	const { color, model, location, average_rate, available_from, available_to } =
		req.query;
	const isFilterByAvailableDates = !!(available_from && available_to);

	try {
		const bikes = await Bike.aggregate([
			{
				$addFields: {
					averageRate: {
						$avg: '$ratings.rate',
					},
				},
			},
			{
				$match: {
					...(color && { color: { $regex: color, $options: 'i' } }),
					...(model && { model: { $regex: model, $options: 'i' } }),
					...(average_rate && { averageRate: parseInt(average_rate, 10) }),
					...(location && { location: { $regex: location, $options: 'i' } }),
				},
			},
			{
				$lookup: {
					from: 'reservations',
					localField: '_id',
					foreignField: 'bike',
					as: 'reservations',
				},
			},
			{
				$match: {
					...(isFilterByAvailableDates && {
						'reservations.from': {
							$not: {
								$gte: new Date(available_from),
								$lte: new Date(available_to),
							},
						},
						'reservations.to': {
							$not: {
								$lte: new Date(available_to),
								$gte: new Date(available_from),
							},
						},
					}),
				},
			},
		]);

		const formattedBikes = bikes.map((bike) => {
			return Bike.hydrate(bike);
		});

		return res.status(STATUS_CODES.ok).json(
			handleSuccessResponse({
				message: 'Bikes retrieved successfully',
				data: formattedBikes,
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

	const updateBikeErrorMessage = 'Failed to update bike';
	const { error } = Bike.validateManageBike({ model, color, image, location });

	if (error) {
		return res
			.status(STATUS_CODES.badRequest)
			.json(handleErrorResponse({ message: updateBikeErrorMessage, error }));
	}

	try {
		const bike = await Bike.findByIdAndUpdate(
			id,
			{ model, color, image, location },
			{ new: true }
		);

		return res.status(STATUS_CODES.ok).json(
			handleSuccessResponse({
				message: 'Bike updated successfully',
				data: bike,
			})
		);
	} catch (error) {
		return res
			.status(STATUS_CODES.serverError)
			.json(handleErrorResponse({ message: updateBikeErrorMessage, error }));
	}
};

const rateBike = async (req, res) => {
	const { rate } = req.body;
	const { bike_id } = req.params;
	const { id: rated_by } = req.user;

	const rateBikeErrorMessage = 'Failed to rate bike';
	const { error } = Bike.validateRateBike({ rate });

	if (error) {
		return res.status(STATUS_CODES.badRequest).json(
			handleErrorResponse({
				message: rateBikeErrorMessage,
				error,
			})
		);
	}

	try {
		let rating;

		const foundRating = await Bike.findOneAndUpdate(
			{
				_id: bike_id,
				'ratings.rated_by': rated_by,
			},
			{
				$set: {
					'ratings.$.rate': rate,
				},
			},
			{ new: true }
		);

		if (foundRating) {
			rating = foundRating;
		} else {
			rating = await Bike.findByIdAndUpdate(
				bike_id,
				{ $push: { ratings: { rated_by, rate } } },
				{ new: true }
			);
		}

		return res.status(STATUS_CODES.ok).json(
			handleSuccessResponse({
				message: 'Rated bike successfully',
				data: rating,
			})
		);
	} catch (error) {
		return res
			.status(STATUS_CODES.serverError)
			.json(handleErrorResponse({ message: rateBikeErrorMessage, error }));
	}
};

module.exports = {
	addBike,
	rateBike,
	getBikes,
	updateBike,
	deleteBike,
};
