<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import { currentLessonData, selectedLessonSlug } from "../../stores";
  import marked from "marked";
  import PageTransitions from "../../components/PageTransitions.svelte";

  // $: markdown = marked($currentLessonData.markdown);

  onMount(async () => {
    const { data } = await axios.get("/api/lesson/" + $selectedLessonSlug);
    $currentLessonData = data;
  });
</script>

<PageTransitions>
  <div class="container container-custom">
    <h1>{$currentLessonData.title}</h1>
    <h4>{$currentLessonData.description}</h4>
    <h4>{$currentLessonData.createdAt}</h4>
    <!-- <p>{@html markdown}</p> -->
  </div>
</PageTransitions>
