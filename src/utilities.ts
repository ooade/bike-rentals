export const formatDate = (date: string) => {
	return Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(
		new Date(date)
	);
};
