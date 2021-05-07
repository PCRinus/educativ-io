<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import { push } from "svelte-spa-router";
  import {
    selectedCategory,
    filteredLessonsData,
    selectedLessonSlug,
  } from "../../stores";
  import PageTransitions from "../../components/PageTransitions.svelte";

  onMount(async () => {
    const { data } = await axios.get(
      "/api/lesson/fromCategory/" + $selectedCategory
    );
    $filteredLessonsData = data;
  });

  function redirectToLesson(slug) {
    $selectedLessonSlug = slug;
    push("/categories/" + $selectedCategory + "/" + $selectedLessonSlug);
  }
</script>

<PageTransitions>
  <div class="container">
    <h1>All lessons for {$selectedCategory}</h1>

    {#if $filteredLessonsData.length === 0}
      <h1>No lessons are added in this category, add some!</h1>
    {/if}

    {#each $filteredLessonsData as filteredLessonData}
      <div class="card">
        <div class="card-content">
          <p class="title">{filteredLessonData.title}</p>
          <p class="subtitle">{filteredLessonData.description}</p>
          <p class="subtitle">Author: {filteredLessonData.author}</p>
          <p class="subtitle">{filteredLessonData.createdAt}</p>

          <button
            class="button is-link"
            on:click={() => redirectToLesson(filteredLessonData.slug)}
            >Go to lesson</button
          >
        </div>
      </div>
    {/each}
  </div>
</PageTransitions>
