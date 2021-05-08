<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import { lessonsData } from "../../stores";
  import LessonList from "../../components/LessonList.svelte";
  import PageTransitions from "../../components/PageTransitions.svelte";

  onMount(async () => {
    const { data } = await axios.get("/api/lesson");
    $lessonsData = data;
  });
</script>

<PageTransitions>
  <div class="container container-custom">
    <h1>All lessons</h1>
    <LessonList lessonList={$lessonsData} />
  </div>
</PageTransitions>
