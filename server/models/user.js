const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passportLocalMongoose = require('passport-local-mongoose');

const config = require('../config');
const { USER_ROLES } = require('../constants');

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			unique: true,
			trim: true,
			required: true,
		},
		fullname: String,
		role: {
			type: String,
			required: true,
			default: 'user',
			enum: USER_ROLES,
		},
	},
	{
		timestamps: true,
	}
);

userSchema.plugin(passportLocalMongoose, {
	usernameField: 'email',
	errorMessages: {
		UserExistsError: 'Email already exists',
		MissingUsernameError: 'No email was given',
		IncorrectUsernameError: 'Email or password is incorrect',
		IncorrectPasswordError: 'Email or password is incorrect',
	},
});

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.passport.secret;

userSchema.statics.jwtStrategy = function jwtStrategy() {
	const User = this;

	return new JwtStrategy(opts, (payload, done) => {
		User.findOne({ _id: payload.id, email: payload.email }, (err, user) => {
			if (err) {
				return done(err, false);
			}

			if (user) {
				return done(null, user);
			} else {
				return done(null, false);
			}
		});
	});
};

userSchema.statics.getToken = function getToken({ user }) {
	const token = jwt.sign(
		{ id: user._id, email: user.email },
		config.passport.secret,
		{
			expiresIn: config.passport.expiresIn,
		}
	);
	return token;
};

module.exports = mongoose.model('user', userSchema);
