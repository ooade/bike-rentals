import * as Yup from 'yup';

export const authSchema = Yup.object().shape({
	email: Yup.string().email().required('Email is required'),
	password: Yup.string().required('Password is required'),
});

export const addUserSchema = Yup.object().shape({
	email: Yup.string().email().required('Email is required'),
	password: Yup.string().required('Password is required'),
	fullname: Yup.string(),
	role: Yup.string(),
});

export const editUserSchema = Yup.object().shape({
	email: Yup.string().email().required('Email is required'),
	fullname: Yup.string(),
	role: Yup.string(),
});

export const addBikeSchema = Yup.object().shape({
	model: Yup.string().required('The bike model is required'),
	color: Yup.string().required('The bike color is required'),
	location: Yup.string().required("The bike's location is required"),
	image: Yup.object({
		public_id: Yup.string().required('The image public id is required'),
		secure_url: Yup.string().required('The secure url is required'),
	}),
});

export const reserveBikeSchema = Yup.object().shape({
	from: Yup.string().required('Reservations date required'),
	to: Yup.string().required('Reservations end required'),
});