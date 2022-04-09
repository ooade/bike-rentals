import {
	Box,
	Text,
	Input,
	Button,
	Heading,
	FormLabel,
	FormControl,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useMutation, useQueryClient } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';

import { authSchema } from '../../schemas';
import { useErrorHandling } from '../../hooks';
import { login, AuthPayload, queryKeys } from '../../api/auth';
import { getTokenAndUpdateHeaders } from '../../api';

import bikeIllustration from '../../assets/bicycle.svg';

export const Login = () => {
	const queryClient = useQueryClient();
	const { renderApiErrorToast } = useErrorHandling();
	const queryCache = queryClient.getQueryCache();

	const navigate = useNavigate();
	const loginMutation = useMutation((payload: AuthPayload) => login(payload), {
		onSuccess: (response) => {
			window.localStorage.setItem('token', response?.data?.token as string);
			getTokenAndUpdateHeaders();
			navigate('/');
		},
		onError: renderApiErrorToast('Could not log you in'),
	});

	const loginForm = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: authSchema,
		onSubmit: (payload) => {
			queryCache.clear();
			queryClient.invalidateQueries(queryKeys.session);
			loginMutation.mutate(payload);
		},
	});

	return (
		<Box
			height="100vh"
			display="flex"
			alignItems="center"
			justifyContent="center"
		>
			<Box flex={[0, 0, 1]}>
				<img src={bikeIllustration} alt="" />
			</Box>
			<Box flex="1" display="flex" justifyContent="center">
				<Box p="2" width="360px" textAlign="center">
					<Heading as="h4" size="md" mb="6" color="blue.400">
						Login to RentABike
					</Heading>

					<form onSubmit={loginForm.handleSubmit}>
						<FormControl mb="2" isRequired>
							<FormLabel htmlFor="email">Email address</FormLabel>
							<Input
								type="email"
								id="email"
								{...loginForm.getFieldProps('email')}
							/>
						</FormControl>
						<FormControl mb="2" isRequired>
							<FormLabel htmlFor="password">Password</FormLabel>
							<Input
								type="password"
								id="password"
								{...loginForm.getFieldProps('password')}
							/>
						</FormControl>
						<Button
							isFullWidth
							type="submit"
							colorScheme="blue"
							isLoading={loginMutation.isLoading}
							isDisabled={loginForm.dirty && !loginForm.isValid}
						>
							{' '}
							Login{' '}
						</Button>
					</form>
					<Text mt="5" color="gray.500">
						New user? <Link to="/register">Create an account</Link> to continue
					</Text>
				</Box>
			</Box>
		</Box>
	);
};
