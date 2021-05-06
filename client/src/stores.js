import {writable, derived} from 'svelte/store';

export const user = writable(null);
export const uuidKey = writable('');
export const uuidRedirectButton = writable(false);
export const userProfile = writable([]);
export const categories = writable([]);
export const selectedCategory = writable('');
export const lessons = writable([]);
export const selectedLesson = writable('');