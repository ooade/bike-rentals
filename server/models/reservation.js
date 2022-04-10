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

module.exports = mongoose.model('reservation', reservationSchema);
