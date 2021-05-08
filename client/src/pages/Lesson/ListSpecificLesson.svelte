<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import { currentLessonData, selectedLessonSlug } from "../../stores";
  import PageTransitions from "../../components/PageTransitions.svelte";

  onMount(async () => {
    const { data } = await axios.get("/api/lesson/" + $selectedLessonSlug);
    $currentLessonData = data;
  });

  let asdf = $currentLessonData;

  let promise = onMount();
</script>

<PageTransitions>
  <div class="container">
    {#await promise then asdf}
      <h1>{$currentLessonData.title}</h1>
      <h4>{$currentLessonData.description}</h4>
      <h4>{$currentLessonData.createdAt}</h4>
      <p>{$currentLessonData.markdown}</p>
    {/await}
  </div>
</PageTransitions>
