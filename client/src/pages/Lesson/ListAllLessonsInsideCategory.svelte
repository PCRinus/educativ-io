<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import { selectedCategory, filteredLessonsData } from "../../stores";
  import LessonList from "../../components/LessonList.svelte";
  import PageTransitions from "../../components/PageTransitions.svelte";

  onMount(async () => {
    const { data } = await axios.get(
      "/api/lesson/fromCategory/" + $selectedCategory
    );
    $filteredLessonsData = data;
  });
</script>

<PageTransitions>
  <div class="container">
    <h1>All lessons for {$selectedCategory}</h1>
    <LessonList lessonList={$filteredLessonsData} />
  </div>
</PageTransitions>
