export const formatDate = (date: string) => {
	return Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(
		new Date(date)
	);
};

export const formatCloudinaryImageUrl = (url: string, format: string) => {
	const searchKey = '/upload/';
	const searchKeyLength = searchKey.length;
	const searchKeyIndex = url.indexOf(searchKey);

	return `${url.slice(0, searchKeyIndex)}${searchKey}${format}/${url.slice(
		searchKeyIndex + searchKeyLength
	)}`;
};
