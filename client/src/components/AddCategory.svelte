<script>
  import axios from "axios";

  let categoryName;
  let categoryDescription;
  function addCategory() {
    const category = {
      name: categoryName,
      description: categoryDescription,
    };
    axios.post("/api/categories", category);
  }

  export let ref;
</script>

<form on:submit|preventDefault={addCategory} {ref}>
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
