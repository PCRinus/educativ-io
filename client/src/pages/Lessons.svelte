<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import { lessons, selectedCategory } from "../stores";

  onMount(async () => {
    const { lessonData } = await axios.get("/api/lesson");
    $lessons = lessonData;
  });
</script>

<div class="container">
  <h1>Available lessons for {$selectedCategory}</h1>
</div>
