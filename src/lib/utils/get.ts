import type { IUser } from '$lib/models/user';
import type { ObjectId } from 'mongoose';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const getTheOtherUser = (members: IUser[], userId: ObjectId) => {
	for (let member of members) {
		if (member._id !== userId) {
			return member;
		}
	}

	return members[0];
};

export const getUser = (members: IUser[], userId: ObjectId) => {
	for (let member of members) {
		if (member._id === userId) {
			return member;
		}
	}

	return members[0];
};

export const getSince = (date: Date) => {
	return dayjs(date).from(dayjs());
};
