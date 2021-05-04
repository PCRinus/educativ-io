<script>
  import axios from "axios";
  import { push } from "svelte-spa-router";
  import { onMount } from "svelte";
  import { categories } from "../stores";
  import AddCategory from "../components/AddCategory.svelte";

  let hideAddCategoryForm = true;

  onMount(async () => {
    const { data } = await axios.get("/api/categories");
    $categories = data;
  });

  function redirectToCategory(categoryName) {
    push("/categories/" + categoryName + "/lessons");
  }
</script>

<div class="container">
  <h1>Categories</h1>

  {#each $categories as lessonCategory}
    <div class="card">
      <div class="card-content">
        <p class="title">{lessonCategory.name}</p>
        <p class="subtitle">{lessonCategory.description}</p>

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
  <div class:visibility = {hideAddCategoryForm}>
    <AddCategory />
  </div>
</div>

<style>
  .visibility {
    display: none;
  }
</style>
