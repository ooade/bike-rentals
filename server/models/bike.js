const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema(
	{
		model: {
			trim: true,
			type: String,
			required: true,
		},
		color: String,
		location: String,
		image: {
			type: Map,
			of: String,
		},
		ratings: [
			{
				rate: {
					type: Number,
					max: 5,
				},
				rated_by: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'user',
				},
			},
		],
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
