<script>
  import axios from "axios";
  import {
    currentLessonTitle,
    currentLessonDescription,
    currentLessonCategory,
  } from "../../stores";
  import { onDestroy } from "svelte";
  import marked from "marked";
  import { push } from "svelte-spa-router";
  import PageTransitions from "../../components/PageTransitions.svelte";

  let source = `
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
  $: markdown = marked(source);

  function submitLesson() {
    const lesson = {
      title: $currentLessonTitle,
      description: $currentLessonDescription,
      parentCategory: $currentLessonCategory.name,
      markdown: source,
    };
    axios.post("/api/lesson", lesson);
    redirectToDashboard();
  }

  function redirectToDashboard() {
    push("/dashboard");
  }

  onDestroy(() => {
    $currentLessonTitle = "";
    $currentLessonDescription = "";
    $currentLessonCategory = [];
  });
</script>

<PageTransitions>
  <div class="container">
    <h1>Markdown Editor</h1>
    <div class="columns">
      <div class="column">
        <h1>Title: {$currentLessonTitle}</h1>
      </div>
      <div class="column">
        <h1>Description: {$currentLessonDescription}</h1>
      </div>
      <div class="column">
        <h1>Category: {$currentLessonCategory.name}</h1>
      </div>
    </div>
    <form on:submit|preventDefault={submitLesson}>
      <div class="markdown-editor">
        <div class="left-panel">
          <textarea bind:value={source} class="source" />
        </div>

        <div class="right-panel">
          <div class="output">{@html markdown}</div>
        </div>
      </div>

      <div class="control">
        <input
          type="submit"
          class="button is-link submit-markdown"
          value="Submit markdown"
        />
      </div>
    </form>
  </div>
</PageTransitions>

<style>
  .markdown-editor {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-evenly;
  }
  .left-panel,
  .right-panel {
    width: 50%;
    border: solid 1px black;
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
    background: #28283f;
    color: #83ba52;
  }
  .source:focus {
    outline: none;
  }
  .output {
    width: 100%;
    padding: 0 2em;
  }

  .submit-markdown {
    margin: 1rem 0;
  }
</style>
