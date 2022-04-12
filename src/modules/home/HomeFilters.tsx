import {
	Box,
	Input,
	Button,
	Select,
	Popover,
	FormLabel,
	PopoverBody,
	FormControl,
	PopoverArrow,
	PopoverContent,
	PopoverTrigger,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { ChevronDown } from '../../components/icons';
import {
	sanitizeObject,
	getCurrentDateInDateInputFormat,
} from '../../utilities';

export const HomeFilters = () => {
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();

	const colorParam = searchParams.get('color');
	const modelParam = searchParams.get('model');
	const statusParam = searchParams.get('status');
	const locationParam = searchParams.get('location');
	const averageRateParam = searchParams.get('averate_rate');
	const availableToParam = searchParams.get('available_to');
	const availableFromParam = searchParams.get('available_from');

	const filterFormInitialValues = {
		color: colorParam || '',
		model: modelParam || '',
		status: statusParam || '',
		location: locationParam || '',
		average_rate: averageRateParam || '',
		available_to: availableToParam || '',
		available_from: availableFromParam || '',
	};

	const filterForm = useFormik({
		initialValues: filterFormInitialValues,
		onSubmit: (payload) => {
			const sanitizedPayload = sanitizeObject(
				payload
			) as typeof filterFormInitialValues;
			setIsFilterOpen(false);
			setSearchParams(sanitizedPayload);
		},
	});

	return (
		<Box display="flex" alignItems="center" height="80px">
			<Popover
				placement="bottom-start"
				isOpen={isFilterOpen}
				onOpen={() => setIsFilterOpen(true)}
				onClose={() => setIsFilterOpen(false)}
			>
				<PopoverTrigger>
					<Button data-testid="filter-bikes" leftIcon={<ChevronDown />}>
						Filter
					</Button>
				</PopoverTrigger>
				<PopoverContent>
					<PopoverArrow />
					<PopoverBody>
						<Box p="2">
							<form onSubmit={filterForm.handleSubmit}>
								<FormControl mb="3">
									<FormLabel htmlFor="status"> Status </FormLabel>
									<Select id="status" {...filterForm.getFieldProps('status')}>
										<option value="">All</option>
										<option value="available_dates">Available dates</option>
									</Select>
								</FormControl>
								{filterForm.values.status === 'available_dates' && (
									<>
										<FormControl
											mb="3"
											isRequired={
												filterForm.values.status === 'available_dates'
											}
										>
											<FormLabel htmlFor="from"> Start date </FormLabel>
											<Input
												size="sm"
												id="from"
												type="date"
												min={getCurrentDateInDateInputFormat()}
												{...filterForm.getFieldProps('available_from')}
											/>
										</FormControl>
										<FormControl
											mb="3"
											isRequired={
												filterForm.values.status === 'available_dates'
											}
										>
											<FormLabel htmlFor="to"> End date </FormLabel>
											<Input
												id="to"
												size="sm"
												type="date"
												min={filterForm.values.available_from}
												isDisabled={!filterForm.values.available_from}
												{...filterForm.getFieldProps('available_to')}
											/>
										</FormControl>
									</>
								)}
								<FormControl mb="3">
									<FormLabel htmlFor="color"> Color </FormLabel>
									<Input
										size="sm"
										id="color"
										type="color"
										{...filterForm.getFieldProps('color')}
									/>
								</FormControl>
								<FormControl mb="3">
									<FormLabel htmlFor="location"> Location </FormLabel>
									<Input
										size="sm"
										id="location"
										placeholder="London"
										{...filterForm.getFieldProps('location')}
									/>
								</FormControl>
								<FormControl mb="3">
									<FormLabel htmlFor="model"> Model </FormLabel>
									<Input
										size="sm"
										id="model"
										placeholder="Mx500"
										{...filterForm.getFieldProps('model')}
									/>
								</FormControl>
								<FormControl mb="4">
									<FormLabel htmlFor="average_rate" size="sm">
										Rate average
									</FormLabel>
									<Input
										min="1"
										step="1"
										max="5"
										size="sm"
										type="number"
										pattern="/\d+/"
										placeholder="4"
										id="average_rate"
										{...filterForm.getFieldProps('average_rate')}
									/>
								</FormControl>
								<Box display="flex" justifyContent="space-between">
									<Button
										size="sm"
										onClick={() => {
											setSearchParams('');
											filterForm.resetForm();
										}}
									>
										Clear
									</Button>
									<Button type="submit" size="sm" colorScheme="blue">
										Submit
									</Button>
								</Box>
							</form>
						</Box>
					</PopoverBody>
				</PopoverContent>
			</Popover>
		</Box>
	);
};

export default HomeFilters;
