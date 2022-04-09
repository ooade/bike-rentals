const mongoose = require('mongoose');

const models = require('./models');

const mongoosePromise = mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((moongoose) => moongoose.connection.getClient());

mongoose.connection.on('error', (error) => {
	console.log('Check your database connection', error);
	process.exit(1);
});

mongoose.connection.on('open', () => {
	console.log('Mongo connected 😉');
});

mongoose.set('toJSON', {
	virtuals: true,
	versionKey: false,
	transform: (doc, converted) => {
		delete converted._id;
	},
});

module.exports = {
	...models,
	mongoosePromise,
};
