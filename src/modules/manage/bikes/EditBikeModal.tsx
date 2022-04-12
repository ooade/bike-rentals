import {
	Text,
	Box,
	Modal,
	Image,
	Input,
	Button,
	Spinner,
	ModalBody,
	FormLabel,
	ModalHeader,
	ModalFooter,
	FormControl,
	ModalOverlay,
	ModalContent,
	ModalCloseButton,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { ChangeEvent, useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { Bike } from '../../../interfaces';
import { addBikeSchema } from '../../../schemas';
import { uploadMedia } from '../../../api/media';
import { queryKeys, updateBike } from '../../../api/bikes';
import { formatCloudinaryImageUrl } from '../../../utilities';
import { useErrorHandling, useSuccessToast } from '../../../hooks';

interface EditBikeModalProps {
	bike: Bike;
	onClose: () => void;
	formattedBikeImageUrl: string;
}

const EditBikeModal = ({
	bike,
	formattedBikeImageUrl,
	onClose,
}: EditBikeModalProps) => {
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const { renderApiSuccessToast } = useSuccessToast();
	const { renderApiErrorToast } = useErrorHandling();
	const queryClient = useQueryClient();

	const UpdateBikeMutation = useMutation(
		(payload: Partial<Bike>) => updateBike(payload),
		{
			onSuccess: (response) => {
				queryClient.invalidateQueries(queryKeys.fetchBikes);
				renderApiSuccessToast('Bike added successfully')(response);
				onClose();
			},
			onError: renderApiErrorToast('Could not add bike'),
		}
	);

	const { id, color, image, location, model } = bike;
	const updateBikeModalForm = useFormik({
		initialValues: { color, image, location, model },
		validationSchema: addBikeSchema,
		onSubmit: (payload) => {
			UpdateBikeMutation.mutate({ id, ...payload });
		},
	});

	const uploadMediaMutation = useMutation((file: File) => uploadMedia(file), {
		onSuccess: (response) => {
			const { secure_url, public_id } = response.data;
			updateBikeModalForm.setFieldValue('image', { secure_url, public_id });
		},
	});

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const fileList = event.target.files;
		const singleFile = fileList?.item(0);

		if (singleFile) {
			uploadMediaMutation.mutate(singleFile);
		}
	};

	const imageUploaded = uploadMediaMutation?.data?.data?.secure_url;

	const imagePreview =
		(imageUploaded &&
			formatCloudinaryImageUrl(imageUploaded, 'c_scale,w_200')) ||
		formattedBikeImageUrl;

	return (
		<Modal isOpen={true} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<form onSubmit={updateBikeModalForm.handleSubmit}>
					<ModalHeader fontSize="md">Update bike</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<FormControl mb="2" isRequired>
							<FormLabel htmlFor="model">Model</FormLabel>
							<Input
								id="model"
								{...updateBikeModalForm.getFieldProps('model')}
							/>
						</FormControl>
						<FormControl mb="2" isRequired>
							<FormLabel htmlFor="color">Color</FormLabel>
							<Input
								type="color"
								id="password"
								{...updateBikeModalForm.getFieldProps('color')}
							/>
						</FormControl>
						<FormControl mb="2" isRequired>
							<FormLabel htmlFor="location">Location</FormLabel>
							<Input
								id="location"
								{...updateBikeModalForm.getFieldProps('location')}
							/>
						</FormControl>
						<FormControl mb="2">
							<FormLabel htmlFor="image">Select image</FormLabel>
							<Box
								display="flex"
								height="40px"
								cursor="pointer"
								borderRadius="sm"
								alignItems="center"
								border="1px dotted"
								borderColor="gray.400"
								justifyContent="center"
								_hover={{
									borderColor: 'gray.300',
								}}
								onClick={() => fileInputRef.current?.click()}
							>
								<Text mr="2">Click to upload image</Text>
								{uploadMediaMutation.isLoading && (
									<Spinner color={updateBikeModalForm.values.color} />
								)}
							</Box>
							{imagePreview && (
								<Box
									mt="2"
									display="flex"
									height="200px"
									justifyContent="center"
								>
									<Image height="100%" src={imagePreview} alt="bike preview" />
								</Box>
							)}
							<Input
								hidden
								type="file"
								id="image"
								accept="image/*"
								ref={fileInputRef}
								onChange={handleFileChange}
							/>
						</FormControl>
					</ModalBody>
					<ModalFooter display="flex" justifyContent="space-between">
						<Button onClick={onClose}>Cancel</Button>
						<Button
							type="submit"
							colorScheme="blue"
							isLoading={UpdateBikeMutation.isLoading}
							isDisabled={
								updateBikeModalForm.dirty && !updateBikeModalForm.isValid
							}
						>
							Submit
						</Button>
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
	);
};

export default EditBikeModal;
