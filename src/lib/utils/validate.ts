export const validateBody = (body: any, keys: string[]) => {
	for (let key of keys) {
		if (!body[key] !== null) {
			return false;
		}
	}
	return true;
};

export const getUpdateDocument = (body: any, keys: string[]) => {
	const update: any = {};
	for (let key of keys) {
		if (body[key] !== null) {
			update[key] = body[key];
		}
	}
	return update;
};
