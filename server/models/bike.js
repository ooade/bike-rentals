const Joi = require('joi');
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

bikeSchema.statics.validateManageBike = (bike) => {
	const schema = Joi.object({
		model: Joi.string().required(),
		color: Joi.string()
			.pattern(new RegExp('^#[a-zA-Z0-9]{3}([a-zA-Z0-9]{3})?$'))
			.required(),
		image: Joi.object({
			public_id: Joi.string().required(),
			secure_url: Joi.string().required(),
		}),
		location: Joi.string().required(),
	});
	return schema.validate(bike);
};

bikeSchema.statics.validateRateBike = (bike) => {
	const schema = Joi.object({
		rate: Joi.number().required(),
	});
	return schema.validate(bike);
};

module.exports = mongoose.model('bike', bikeSchema);
