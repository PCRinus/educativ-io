<script>
  import axios from "axios";
  import moment from "moment";
  import { push } from "svelte-spa-router";
  import { selectedLessonSlug, userName } from "../stores";

  function manageFavourites(lessonId, isFavourite) {
    axios.patch("/api/lesson/" + lessonId, { isFavourite: !isFavourite });
  }

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
        <p class="subtitle">
          <!-- svelte-ignore a11y-missing-attribute -->
          Author:
          <a on:click={() => redirectToUserProfile(lesson.author)}
            >{lesson.author}</a
          >
        </p>
        <p class="subtitle">
          {moment(lesson.createdAt).format("Do MMMM YYYY")}
        </p>

        <button
          id={lesson.slug}
          class="button is-link"
          on:click={() => redirectToLesson(lesson.slug)}>Go to lesson</button
        >
        <!-- {#if lesson.isFavourite === true}
          <button
            class="button is-link"
            on:click={() => manageFavourites(lesson._id, lesson.isFavourite)}
            >Remove from favourites</button
          >
        {:else}
          <button
            class="button is-link"
            on:click={() => manageFavourites(lesson._id, lesson.isFavourite)}
            >Add to favourites</button
          >
        {/if} -->
      </div>
    </div>
  {/each}
{/if}
