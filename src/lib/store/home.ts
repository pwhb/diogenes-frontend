import mongoose from 'mongoose';
import { writable } from 'svelte/store';

export const searchResults = writable([]);

export const usersfollowing = writable([]);

export const usersfollowed = writable([]);
