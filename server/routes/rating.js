const { Rating, Bike } = require('../db');
const { STATUS_CODES } = require('../constants');
const { handleErrorResponse, handleSuccessResponse } = require('../utils');

const rateBike = async (req, res) => {
	const { rate } = req.body;
	const { bike_id: bike } = req.params;
	const { id: created_by } = req.user;

	try {
		const foundRating = await Rating.findOne({ bike, created_by });
		let rating = await new Rating({ bike, created_by, rate });

		if (foundRating) {
			rating = await Rating.findByIdAndUpdate(
				foundRating.id,
				{ rate },
				{ new: true }
			);
		} else {
			await Bike.findByIdAndUpdate(bike, { $push: { ratings: rating } });
			await rating.save();
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
			.json(handleErrorResponse({ message: 'Failed to rate bike', error }));
	}
};

module.exports = {
	rateBike,
};
