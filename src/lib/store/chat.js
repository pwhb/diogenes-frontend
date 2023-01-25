import { writable } from 'svelte/store';

export const messages = writable([]);

export const chatInput = writable('');

export const username = writable('');

export const roomName = writable('');
