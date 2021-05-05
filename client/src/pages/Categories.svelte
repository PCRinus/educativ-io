<script>
  import axios from "axios";
  import { push } from "svelte-spa-router";
  import { onMount } from "svelte";
  import { categories, selectedCategory } from "../stores";

  let hideAddCategoryForm = true;
  let categoryName = "";
  let categoryDescription = "";

  onMount(async () => {
    const { data } = await axios.get("/api/categories");
    $categories = data;
  });

  async function addCategory() {
    const category = {
      name: categoryName,
      description: categoryDescription,
    };
    const response = await axios.post("/api/categories", category);
    $categories = [...$categories, response.data];
    hideAddCategoryForm = !hideAddCategoryForm
  }

  function redirectToCategory(categoryName) {
    $selectedCategory = categoryName;
    push("/categories/" + categoryName + "/lessons");
  }
</script>

<div class="container">
  <h1>Categories</h1>

  {#if $categories.length === 0}
    <h1>No categories are added, add some!</h1>
  {/if}

  {#each $categories as lessonCategory}
    <div class="card">
      <div class="card-content">
        <p class="title">{lessonCategory.name}</p>
        <p class="subtitle">{lessonCategory.description}</p>
        <p class="subtitle">Author: {lessonCategory.author}</p>

        <button
          class="button is-link"
          on:click={() => redirectToCategory(lessonCategory.name)}
          >See all the lessons for the {lessonCategory.name} category</button
        >
      </div>
    </div>
  {/each}

  <button
    class="button is-link"
    on:click={() => (hideAddCategoryForm = !hideAddCategoryForm)}
    >ADMIN - add category</button
  >

  <div class:visibility={hideAddCategoryForm}>
    <h1>Add a category</h1>
    <form on:submit|preventDefault={addCategory}>
      <div class="field">
        <label for="" class="label">Category name</label>
        <input type="text" class="input" bind:value={categoryName} required />
      </div>

      <div class="field">
        <label for="" class="label">Category description</label>
        <input
          type="text"
          class="input"
          bind:value={categoryDescription}
          required
        />
      </div>

      <div class="control">
        <input type="submit" class="button is-link" value="Add category" />
      </div>
    </form>
  </div>
</div>

<style>
  .visibility {
    display: none;
  }
</style>
