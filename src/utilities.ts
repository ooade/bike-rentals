export const formatDate = (date: string) => {
	return Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(
		new Date(date)
	);
};

export const getCurrentDateInDateInputFormat = () => {
	const currentDate = new Date().toLocaleDateString();
	const [day, month, year] = currentDate.split('/');
	return `${year}-${month}-${day}`;
};

export const sanitizeObject = (object: Record<string, unknown>) => {
	return Object.keys(object).reduce((newObject, objectKey) => {
		const value = object[objectKey];
		if (value) {
			newObject[objectKey] = value;
		}
		return newObject;
	}, {} as Record<string, unknown>);
};

export const formatCloudinaryImageUrl = (
	url: string,
	format = 'c_scale,w_400'
) => {
	const searchKey = '/upload/';
	const searchKeyLength = searchKey.length;
	const searchKeyIndex = url.indexOf(searchKey);

	return `${url.slice(0, searchKeyIndex)}${searchKey}${format}/${url.slice(
		searchKeyIndex + searchKeyLength
	)}`;
};