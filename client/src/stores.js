import {writable, derived} from 'svelte/store';

export const user = writable(null);
export const uuidKey = writable('');
export const uuidRedirectButton = writable(false);
export const userProfile = writable([]);
export const categoriesData = writable([]);
export const selectedCategory = writable('');
export const lessonsData = writable([]);
export const selectedLesson = writable('');