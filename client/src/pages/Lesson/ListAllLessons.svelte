<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import { lessons, selectedLesson } from "../../stores";
  import { push } from "svelte-spa-router";
  import PageTransitions from "../../components/PageTransitions.svelte";

  onMount(async () => {
    const { data } = await axios.get("/api/lesson");
    $lessons = data;
  });

  function redirectToLesson(slug) {
    $selectedLesson = slug;
    push("/lessons/" + slug);
  }
</script>

<PageTransitions>
  <div class="container">
    <h1>All lessons</h1>
    {#each $lessons as lesson}
      <div class="card">
        <div class="card-content">
          <p class="title">{lesson.title}</p>
          <p class="subtitle">{lesson.description}</p>
          <p class="subtitle">{lesson.createdAt}</p>

          <button
            class="button is-link"
            on:click={() => redirectToLesson(lesson.slug)}
            >Go to lesson</button
          >
        </div>
      </div>
    {/each}
  </div>
</PageTransitions>
