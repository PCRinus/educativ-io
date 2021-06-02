<script>
  import axios from "axios";
  import {
    currentLessonTitle,
    currentLessonDescription,
    currentLessonCategory,
  } from "../../stores";
  import { onDestroy, onMount } from "svelte";
  import marked from "marked";
  import { push } from "svelte-spa-router";
  import MarkdownExplanation from "./MarkdownExplanation.svelte";
  import PageTransitions from "../../components/PageTransitions.svelte";

  let source = `
  # This is an example
  ### Write your lesson here ...`;
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

  onMount(() => {
    if($currentLessonTitle === "" || $currentLessonDescription === "" || typeof $currentLessonCategory === undefined) {
      push("/new-lesson");
    }
  })

  onDestroy(() => {
    $currentLessonTitle = "";
    $currentLessonDescription = "";
    $currentLessonCategory = [];
  });
</script>

<PageTransitions>
  <div class="container">
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
    <div class="columns">
      <div class="column is-9">
        <form on:submit|preventDefault={submitLesson}>
          <div class="markdown-editor">
            <div class="left-panel">
              <textarea
                bind:value={source}
                class="source"
                placeholder="Write your lesson here..."
              />
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

      <div class="column">
        <h4>Editor basics</h4>
        <p>
          Use <a
            href="https://github.com/adam-p/markdown-here/wiki/Markdown-Here-Cheatsheet"
            target="_blank">Markdown</a
          > to write and format posts.
        </p>
        <details open>
          <summary>Commonly used syntax</summary>
          <MarkdownExplanation />
        </details>
      </div>
    </div>
  </div>
</PageTransitions>

<style>
  textarea {
    resize: none;
  }
  .markdown-editor {
    display: flex;
    align-items: flex-start;
    justify-content: space-evenly;
  }
  .left-panel,
  .right-panel {
    width: 50%;
    border: solid 1px black;
    border-radius: 5px;
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
