<script>
  import PageTransitions from "../../components/PageTransitions.svelte";

  let lessonTitle = "";
  let lessonDescription = "";
  let markdown = "";

  function newLesson() {}
</script>

<PageTransitions>
  <div class="container">
    <h1>New Lesson</h1>
    <form on:submit|preventDefault={newLesson}>
      <div class="field">
        <label for="" class="label">Lesson Title</label>
        <input type="text" class="input" bind:value={lessonTitle} required />
      </div>

      <div class="field">
        <label for="" class="label">Description</label>
        <input type="text" class="input" bind:value={lessonDescription} required />
      </div>

      <div class="field">
        <label for="" class="label">Markdown</label>
        <input type="text" class="input" bind:value={markdown} required />
      </div>

      <div class="control">
        <input type="submit" class="button is-link" value="Add lesson" />
      </div>
    </form>
  </div>
</PageTransitions>
