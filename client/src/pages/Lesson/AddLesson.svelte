<script>
  import {
    currentLessonTitle,
    currentLessonDescription,
    currentLessonCategory,
    categoriesData,
  } from "../../stores";
  import { onMount } from "svelte";
  import axios from "axios";
  import { push } from "svelte-spa-router";
  import PageTransitions from "../../components/PageTransitions.svelte";

  onMount(async () => {
    const { data } = await axios.get("/api/categories");
    $categoriesData = data;
  });

  function redirectToEditor() {
    push("/new-lesson/markdown");
  }
</script>

<PageTransitions>
  <div class="container">
    <h1>Add lesson details</h1>
    <form on:submit|preventDefault={redirectToEditor}>
      <div class="field">
        <label for="" class="label">Lesson Title</label>
        <input
          type="text"
          class="input"
          bind:value={$currentLessonTitle}
          required
        />
      </div>

      <div class="field">
        <label for="" class="label">Description</label>
        <input
          type="text"
          class="input"
          bind:value={$currentLessonDescription}
          required
        />
      </div>

      <div class="field">
        <label for="" class="label">Category</label>
        <!-- svelte-ignore a11y-no-onchange -->
        <select
          class="category-selector"
          bind:value={$currentLessonCategory}
        >
        <option disabled selected value=''>Please choose a category</option>
          {#each $categoriesData as category}
            <option value={category}>
              {category.name}
            </option>
          {/each}
        </select>
      </div>

      <div class="control">
        <input
          type="submit"
          class="button is-link go-to-editor"
          value="Go to editor"
        />
      </div>
    </form>
  </div>
</PageTransitions>

<style>
  .control {
    display: flex !important;
    flex-direction: row-reverse;
  }
  .category-selector {
    box-shadow: inset 0 0.0625em 0.125em rgba(10, 10, 10, 0.05);
    max-width: 100%;
    width: 100%;
    background-color: #fff;
    border-color: #dbdbdb;
    border-radius: 4px;
    color: #363636;
    height: 2.5em;
    font-size: 1rem;
    padding-bottom: calc(0.5em - 1px);
    padding-left: calc(0.75em - 1px);
    padding-right: calc(0.75em - 1px);
    padding-top: calc(0.5em - 1px);
  }
  .category-selector:hover {
    border-color: #b5b5b5;
  }
</style>
