import { writable } from "svelte/store";

export const you = writable("");

export const user = writable(null);
export const uuidKey = writable("");
export const uuidRedirectButton = writable(false);
export const userProfile = writable([]);
export const userName = writable("");
export const categoriesData = writable([]);
export const selectedCategory = writable("");
export const lessonsData = writable([]);
export const filteredLessonsData = writable([]);
export const currentLessonData = writable([]);
export const selectedLessonSlug = writable("");
export const favouriteLessons = writable([]);

export const currentLessonTitle = writable("");
export const currentLessonDescription = writable("");
export const currentLessonCategory = writable([]);
