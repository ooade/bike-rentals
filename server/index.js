require('dotenv').config();

const cors = require('cors');
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const compression = require('compression');

const { User } = require('./db');
const { __DEV__ } = require('./utils');
const routes = require('./routes');

const PORT = process.env.PORT || 8080;

// Catch all unhandled rejections throughout the app
process.on('unhandledRejection', (err) => {
	console.log('Unhandled Rejection', err);

	if (__DEV__) {
		process.exit(1);
	}
});

const app = express();

app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

passport.use(User.createStrategy());
passport.use(User.jwtStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

routes(app);

app.get('**', (req, res) => {
	return res.status(404).send('Not found');
});

app.listen(PORT, (err) => {
	if (err) throw err;

	console.log(`> App running on port ${PORT}`);
});
