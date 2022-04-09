const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema(
	{
		model: {
			type: String,
			trim: true,
			required: true,
		},
		model_id: String,
		rate: {
			type: Number,
			max: 5,
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

module.exports = mongoose.model('rating', ratingSchema);
