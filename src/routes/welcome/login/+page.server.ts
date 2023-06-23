import { fail, redirect } from '@sveltejs/kit';
import type { Action, Actions, PageServerLoad } from './$types';
import { verify } from 'argon2';
import { getJwt } from '$lib/utils/jwt';
import clientPromise from '$lib/database/mongodb';
import { DB_NAME } from '$env/static/private';
import DBKeys from '$lib/consts/DBKeys';

export const load: PageServerLoad = async ({ locals }) =>
{
	if (locals.user)
	{
		throw redirect(302, '/home');
	}
};

const login: Action = async ({ request, cookies }) =>
{
	const data = await request.formData();
	const { username, password } = Object.fromEntries(data);

	const invalid = { username: '', password: '' };
	const previous = { username };
	if (!username)
	{
		invalid.username = 'username cannot be empty';
	}
	if (!password)
	{
		invalid.password = 'password cannot be empty';
	}

	if (invalid.username || invalid.password)
	{
		return fail(400, { invalid, previous });
	}

	const client = await clientPromise;
	const col = client.db(DB_NAME).collection(DBKeys.UserCollection);

	const doc = await col.findOne({ username });
	if (!doc)
	{
		invalid.username = "user doesn't exist";
		return fail(400, { invalid, previous });
	}

	const isCorrect = await verify(doc.password, password as string);

	if (!isCorrect)
	{
		invalid.password = 'wrong password';
		return fail(400, { invalid, previous });
	}


	const token = getJwt({
		_id: doc._id, username: doc.username
	});

	cookies.set('token', token, {
		httpOnly: true,
		path: '/',
		secure: true,
		sameSite: 'strict',
		maxAge: 60 * 60 * 24 // 1 day
	});

	throw redirect(303, '/home');
};

export const actions: Actions = {
	default: login
};
