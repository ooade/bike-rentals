const Joi = require('joi');
const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema(
	{
		bike: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'bike',
		},
		from: {
			type: Date,
			required: true,
		},
		to: {
			type: Date,
			required: true,
		},
		created_by: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user',
		},
	},
	{
		timestamps: true,
	}
);

reservationSchema.statics.validateReserveBike = (reservation) => {
	const schema = Joi.object({
		from: Joi.date().required(),
		to: Joi.date().greater(Joi.ref('from')).required(),
	});
	return schema.validate(reservation);
};

module.exports = mongoose.model('reservation', reservationSchema);
