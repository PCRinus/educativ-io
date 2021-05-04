import {writable, derived} from 'svelte/store';

export const user = writable(null);
export const uuidKey = writable('');
export const userProfile = writable([]);
export const categories = writable([]);
export const lessons = writable([]);