<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import { lessons } from "../stores";

  onMount(async () => {
    const { lessonData } = await axios.get("/api/lesson");
    $lessons = lessonData;
  });
</script>

<div class="container">
  <h1>Available Lessons:</h1>
</div>
