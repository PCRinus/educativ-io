<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import { lessonsData, selectedLessonSlug } from "../../stores";
  import { push } from "svelte-spa-router";
  import LessonList from "../../components/LessonList.svelte";
  import PageTransitions from "../../components/PageTransitions.svelte";

  onMount(async () => {
    const { data } = await axios.get("/api/lesson");
    $lessonsData = data;
  });

  function redirectToLesson(slug) {
    $selectedLessonSlug = slug;
    push("/lessons/" + slug);
  }
</script>

<PageTransitions>
  <div class="container">
    <h1>All lessons</h1>
    <LessonList lessonList={$lessonsData}/>
  </div>
</PageTransitions>
