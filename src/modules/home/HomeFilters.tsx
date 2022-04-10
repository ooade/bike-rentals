import {
	Box,
	Input,
	Button,
	Popover,
	FormLabel,
	PopoverBody,
	FormControl,
	PopoverArrow,
	PopoverContent,
	PopoverTrigger,
} from '@chakra-ui/react';

export const HomeFilters = () => {
	return (
		<Box display="flex" alignItems="center" p="5">
			<Popover placement="bottom-start">
				<PopoverTrigger>
					<Button> Filter </Button>
				</PopoverTrigger>
				<PopoverContent>
					<PopoverArrow />
					<PopoverBody>
						<Box as="form" p="2">
							<FormControl mb="3">
								<FormLabel htmlFor="color"> Color </FormLabel>
								<Input id="color" type="color" size="sm" />
							</FormControl>
							<FormControl mb="3">
								<FormLabel htmlFor="location"> Location </FormLabel>
								<Input id="location" placeholder="London" size="sm" />
							</FormControl>
							<FormControl mb="4">
								<FormLabel htmlFor="rateAverage" size="sm">
									Rate average
								</FormLabel>
								<Input
									size="sm"
									type="number"
									placeholder="4"
									id="rateAverage"
								/>
							</FormControl>
							<Box display="flex" justifyContent="space-between">
								<Button size="sm">Clear</Button>
								<Button size="sm" colorScheme="blue">
									Submit
								</Button>
							</Box>
						</Box>
					</PopoverBody>
				</PopoverContent>
			</Popover>
			<Box ml="3">
				<Input placeholder="Search model" />
			</Box>
		</Box>
	);
};

export default HomeFilters;
