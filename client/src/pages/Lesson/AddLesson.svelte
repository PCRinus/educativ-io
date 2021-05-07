<script>
  import axios from "axios";
  import { lessonsData } from "../../stores";
  import { push } from "svelte-spa-router";
  import slugify from "slugify";
  import PageTransitions from "../../components/PageTransitions.svelte";

  let lessonTitle = "";
  let lessonDescription = "";
  let lessonParentCategory = "";
  let markdown = "";
  let slug = "";

  async function newLesson() {
    const newLesson = {
      title: lessonTitle,
      description: lessonDescription,
      parentCategory: lessonParentCategory,
      markdown: markdown,
    };
    const response = await axios.post("/api/lesson", newLesson);
    $lessonsData = [...$lessonsData, response.data];
    // slug = slugify(response.data.slug);
    // redirectToLesson(slug);
    redirectToDashboard();
  }

  function redirectToLesson(slug) {
    push("/lessons/" + slug);
  }

  function redirectToDashboard() {
    push("/dashboard");
  }
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
        <input
          type="text"
          class="input"
          bind:value={lessonDescription}
          required
        />
      </div>

      <div class="field">
        <label for="" class="label">Category</label>
        <input
          type="text"
          class="input"
          bind:value={lessonParentCategory}
          required
        />
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
