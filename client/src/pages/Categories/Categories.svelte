<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import { push } from "svelte-spa-router";
  import { categoriesData, selectedCategory } from "../../stores";
  import CategoryList from "../../components/CatgoryList.svelte";
  import PageTransitions from "../../components/PageTransitions.svelte";

  onMount(async () => {
    const { data } = await axios.get("/api/categories");
    $categoriesData = data;
  });

  function redirectToAddCategory() {
    push("/new-category");
  }
</script>

<PageTransitions>
  <div class="container container-custom">
    <div class="category-list-header">
      <h1>Categories</h1>
      <button class="button is-link" on:click={redirectToAddCategory}
      >Add category</button
    >
    </div>
    <CategoryList categoryList={$categoriesData} />
  </div>
</PageTransitions>

<style>
  .category-list-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
</style>
