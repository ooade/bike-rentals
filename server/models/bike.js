const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema(
	{
		model: {
			type: String,
			unique: true,
			trim: true,
			required: true,
		},
		color: String,
		location: String,
		image: {
			type: Map,
			of: String,
		},
		ratings: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'rating',
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

module.exports = mongoose.model('bike', bikeSchema);
