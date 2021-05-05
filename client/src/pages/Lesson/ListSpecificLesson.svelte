<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import { lessons, selectedCategory } from "../../stores";
  import PageTransitions from "../../components/PageTransitions.svelte";

  //TODO: there is a bug with the onMount that is in then other listLesson endpoint
  // onMount(async () => {
  //   const { lessonData } = await axios.get("/api/lesson");
  //   $lessons = lessonData;
  // });
</script>

<PageTransitions>
  <div class="container">
    <h1>Available lessons for {$selectedCategory}</h1>
  </div>
</PageTransitions>
