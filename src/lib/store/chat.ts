import { writable } from 'svelte/store';

export const rooms = writable([]);

export const typingUser = writable("")

export const messagesStore = writable([]);
