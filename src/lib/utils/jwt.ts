import { AUTH_SECRET_KEY } from '$env/static/private';
import jwt from 'jsonwebtoken';

// const ONE_HOUR = Math.floor(Date.now() / 1000) + (60 * 60)

export const getJwt = (payload: string | object) =>
{
	const token = jwt.sign(payload, AUTH_SECRET_KEY);
	return token;
};

export const decodeJwt = (token: string) =>
{
	const decoded = jwt.verify(token, AUTH_SECRET_KEY);
	return decoded;
};
