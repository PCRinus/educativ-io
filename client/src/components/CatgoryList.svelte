<script>
  import { push } from "svelte-spa-router";
  import { selectedCategory, userName } from "../stores";

  function redirectToCategory(categoryName) {
    $selectedCategory = categoryName;
    push("/categories/" + categoryName);
  }

  function redirectToUserProfile(author) {
    $userName = author;
    push("/profile/" + $userName);
  }

  export let categoryList;
</script>

{#if categoryList.length === 0}
  <h1>No categories are added, add some!</h1>
{/if}

{#each categoryList as categoryData}
  <div class="card">
    <div class="card-content">
      <p class="title">{categoryData.name}</p>
      <p class="subtitle">{categoryData.description}</p>
      <p class="subtitle">
        <!-- svelte-ignore missing-declaration -->
        <!-- svelte-ignore a11y-missing-attribute -->
        Author: <a on:click={() => redirectToUserProfile(categoryData.author)}
          >{categoryData.author}</a
        >
      </p>

      <button
        class="button is-link"
        on:click={() => redirectToCategory(categoryData.name)}
        >See all the lessons for the {categoryData.name} category</button
      >
    </div>
  </div>
{/each}
