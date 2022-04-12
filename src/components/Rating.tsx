import { Box } from '@chakra-ui/react';
import { forwardRef, useRef, useState } from 'react';

interface RatingProps {
	value: number;
	onChange?: (rate: number) => void;
}

export const Rating = forwardRef<HTMLDivElement, RatingProps>(
	({ value, onChange, ...props }, ref) => {
		const initialRateRef = useRef(Math.ceil(value));
		const [rate, setRate] = useState(initialRateRef.current);

		const filledStars = [...Array(rate)].fill(1);
		const unfilledStars = [...Array(5 - rate)];
		const stars = [...filledStars, ...unfilledStars];

		const handleClick = (rate: number) => {
			onChange?.(rate);
		};

		return (
			<Box {...props} ref={ref}>
				{stars.map((star, index) => (
					<Box
						as="span"
						key={index}
						cursor="pointer"
						data-testid={`star-${index}`}
						onClick={() => {
							handleClick(index + 1);
							initialRateRef.current = index + 1;
						}}
						onMouseEnter={() => onChange && setRate(index + 1)}
						onMouseLeave={() => onChange && setRate(initialRateRef.current)}
					>
						{star ? <span>&#9733;</span> : <span>&#9734;</span>}
					</Box>
				))}
			</Box>
		);
	}
);
