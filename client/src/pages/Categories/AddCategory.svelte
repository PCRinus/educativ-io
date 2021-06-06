<script>
  import axios from "axios";
  import { categoriesData } from "../../stores";
  import { push } from "svelte-spa-router";
  import PageTransitions from "../../components/PageTransitions.svelte";

  let categoryName = "";
  let categoryDescription = "";

  async function addCategory() {
    const category = {
      name: categoryName,
      description: categoryDescription,
    };
    const response = await axios.post("/api/categories", category);
    $categoriesData = [...$categoriesData, response.data];
    push("/categories");
  }
</script>

<PageTransitions>
  <div class="container container-custom section">
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
</PageTransitions>
