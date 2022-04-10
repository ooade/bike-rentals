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

import { createAccount, AuthPayload, queryKeys } from '../../api/auth';
import { getTokenAndUpdateHeaders } from '../../api';
import { useErrorHandling } from '../../hooks';
import { authSchema } from '../../schemas';

import bikeIllustration from '../../assets/bicycle2.svg';

export const CreateAccount = () => {
	const queryClient = useQueryClient();
	const { renderApiErrorToast } = useErrorHandling();
	const queryCache = queryClient.getMutationCache();

	const navigate = useNavigate();
	const createAccountMutation = useMutation(
		(payload: AuthPayload) => createAccount(payload),
		{
			onSuccess: (response) => {
				window.localStorage.setItem('token', response?.data?.token as string);
				getTokenAndUpdateHeaders();
				navigate('/');
			},
			onError: renderApiErrorToast('Could not create an account'),
		}
	);

	const createAccountForm = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: authSchema,
		onSubmit: (payload) => {
			queryCache.clear();
			queryClient.invalidateQueries(queryKeys.fetchCurrentUser);
			createAccountMutation.mutate(payload);
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
						Create an account to RentABike
					</Heading>

					<form onSubmit={createAccountForm.handleSubmit}>
						<FormControl mb="2" isRequired>
							<FormLabel htmlFor="email">Email address</FormLabel>
							<Input
								type="email"
								id="email"
								{...createAccountForm.getFieldProps('email')}
							/>
						</FormControl>
						<FormControl mb="2" isRequired>
							<FormLabel htmlFor="password">Password</FormLabel>
							<Input
								type="password"
								id="password"
								{...createAccountForm.getFieldProps('password')}
							/>
						</FormControl>
						<Button
							isFullWidth
							type="submit"
							colorScheme="blue"
							isLoading={createAccountMutation.isLoading}
							isDisabled={createAccountForm.dirty && !createAccountForm.isValid}
						>
							{' '}
							Create an account{' '}
						</Button>
					</form>
					<Text mt="5" color="gray.500">
						Already have an account? <Link to="/login">Login</Link> to continue
					</Text>
				</Box>
			</Box>
		</Box>
	);
};
