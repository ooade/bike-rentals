const cloudinary = require('cloudinary');

const twentyFourHours = 60 * 60 * 24;

const passport = {
	secret: process.env.AUTH_SECRET_KEY,
	expiresIn: twentyFourHours,
};

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

module.exports = {
	passport,
	cloudinary,
};
