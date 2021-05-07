<script>
  import axios from "axios";
  import { lessonsData } from "../../stores";
  import { push } from "svelte-spa-router";
  import slugify from "slugify";
  import marked from "marked";
  import PageTransitions from "../../components/PageTransitions.svelte";

  let lessonTitle = "";
  let lessonDescription = "";
  let lessonParentCategory = "";
  // let lessonMarkdown = "";
  let slug = "";

  let lessonMarkdown = `
# H1 heading

## H2 heading

### H3 heading

--------

**bold text**

*italicized text*

--------

1. First item
2. Second item
3. Third item

- First item
- Second item
- Third item

[Svelte](https://svelte.dev/)
`;
  $: markdown = marked(lessonMarkdown);

  async function newLesson() {
    const newLesson = {
      title: lessonTitle,
      description: lessonDescription,
      parentCategory: lessonParentCategory,
      markdown: lessonMarkdown,
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

      <!-- <div class="field">
        <label for="" class="label">Markdown</label>
        <input type="text" class="input" bind:value={lessonMarkdown} required />
      </div> -->

      <label for="" class="label">Markdown</label>
      <div class="markdown-editor">
        <div class="left-panel">
            <textarea bind:value={lessonMarkdown} class="source"></textarea>
        </div>
    
        <div class="right-panel">
            <div class="output">{@html markdown}</div>
        </div>
    </div>

      <div class="control">
        <input type="submit" class="button is-link" value="Add lesson" />
      </div>
    </form>
  </div>
</PageTransitions>

<style>
    .markdown-editor {
        width: 100%;
        display: flex;
        align-items:flex-start;
        justify-content: space-evenly;
    }
    .left-panel, .right-panel {
        width: 50%;
        border: solid 1px;
        border-color: #b5b5b5;
        border-radius: 4px;
        height: 85vh;
        background: #ffffff;
    }
    .right-panel {
        overflow: auto;
    }
    .source {
        border: none;
        width: 100%;
        height: 100%;
        background: #2a2e41;
        color: #ffffff;
    }
    .source:focus {
        outline: none;
    }
    .output {
        width: 100%;
        padding: 0 2em;
    }
</style>
