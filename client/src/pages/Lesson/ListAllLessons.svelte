<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import { lessonsData, selectedLesson } from "../../stores";
  import { push } from "svelte-spa-router";
  import PageTransitions from "../../components/PageTransitions.svelte";

  onMount(async () => {
    const { data } = await axios.get("/api/lesson");
    $lessonsData = data;
  });

  function redirectToLesson(slug) {
    $selectedLesson = slug;
    push("/lessons/" + slug);
  }
</script>

<PageTransitions>
  <div class="container">
    <h1>All lessons</h1>
    {#each $lessonsData as lessonData}
      <div class="card">
        <div class="card-content">
          <p class="title">{lessonData.title}</p>
          <p class="subtitle">{lessonData.description}</p>
          <p class="subtitle">{lessonData.createdAt}</p>

          <button
            class="button is-link"
            on:click={() => redirectToLesson(lessonData.slug)}
            >Go to lesson</button
          >
        </div>
      </div>
    {/each}
  </div>
</PageTransitions>
