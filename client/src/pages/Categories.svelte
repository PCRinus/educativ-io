<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import { lessonCategories } from "../stores";

  onMount(async () => {
    const { data } = await axios.get("/api/categories");
    $lessonCategories = data;
  });
</script>

<div class="container">
  <h1>Categories</h1>

  {#each $lessonCategories as lessonCategory}
    <div class="card">
      <div class="card-content">
        <p class="title">{lessonCategory.name}</p>
        <p class="subtitle">{lessonCategory.description}</p>
      </div>
    </div>
  {/each}
</div>
