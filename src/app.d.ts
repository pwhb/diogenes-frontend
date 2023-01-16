// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { IUser } from '$lib/models/user';

// and what to do when importing types
declare namespace App {
	// interface Error {}
	interface Locals {
		user: IUser;
	}
	// interface PageData {}
	// interface Platform {}
}
