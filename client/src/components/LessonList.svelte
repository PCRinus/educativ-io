<script>
  import { push } from "svelte-spa-router";
  import { selectedLessonSlug, userName } from "../stores";

  function redirectToLesson(slug) {
    $selectedLessonSlug = slug;
    push("/lessons/" + $selectedLessonSlug);
  }

  function redirectToUserProfile(author) {
    $userName = author;
    push("/profile/" + $userName);
  }

  export let lessonList;
</script>

{#if lessonList.length === 0}
  <h1>No lessons are currently available!</h1>
{:else}
  {#each lessonList as lesson}
    <div class="card">
      <div class="card-content">
        <p class="title">{lesson.title}</p>
        <p class="subtitle">{lesson.description}</p>
        <p class="subtitle" on:click={() => redirectToUserProfile(lesson.author)}>Author: {lesson.author}</p>
        <p class="subtitle">{lesson.createdAt}</p>

        <button
          class="button is-link"
          on:click={() => redirectToLesson(lesson.slug)}>Go to lesson</button
        >
      </div>
    </div>
  {/each}
{/if}
