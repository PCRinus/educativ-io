<script>
  import {
    lessonsData,
    currentLessonTitle,
    currentLessonDescription,
    currentLessonCategory,
    currentLessonMarkdown,
  } from "../../stores";
  import { onMount, onDestroy } from "svelte";
  import PageTransitions from "../../components/PageTransitions.svelte";

  onDestroy(()=> {
    $currentLessonTitle = '';
    $currentLessonDescription = '';
    $currentLessonCategory = [];
  })
</script>

<PageTransitions>
  <div class="container">
    <h1>Markdown Editor</h1>
    <p>{$currentLessonTitle}</p>
    <p>{$currentLessonDescription}</p>
    <p>{$currentLessonCategory.name}</p>
  </div>
</PageTransitions>
