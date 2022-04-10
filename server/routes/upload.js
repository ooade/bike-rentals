const { cloudinary } = require('../config');
const { STATUS_CODES } = require('../constants');
const { handleErrorResponse, handleSuccessResponse } = require('../utils');

const uploadMedia = async (req, res) => {
	try {
		const image = await cloudinary.v2.uploader.upload(req.file.path);
		return res.status(STATUS_CODES.created).json(
			handleSuccessResponse({
				message: 'Media uploaded successfully',
				data: image,
			})
		);
	} catch (error) {
		return res.status(STATUS_CODES.serverError).json(
			handleErrorResponse({
				message: 'Could not upload media',
				error,
			})
		);
	}
};

const deleteMedia = async (req, res) => {
	const publicId = req.params.id;
	try {
		await cloudinary.v2.uploader.destroy(publicId);
		return res.status(STATUS_CODES.ok).json(
			handleSuccessResponse({
				message: 'Media delete successfully',
				data: null,
			})
		);
	} catch (error) {
		return res.status(STATUS_CODES.serverError).json(
			handleErrorResponse({
				message: 'Could not delete media',
				error,
			})
		);
	}
};

module.exports = {
	uploadMedia,
	deleteMedia,
};
