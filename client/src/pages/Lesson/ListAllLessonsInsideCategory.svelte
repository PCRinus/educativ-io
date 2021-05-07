<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import { push } from "svelte-spa-router";
  import { selectedCategory } from "../../stores";
  import PageTransitions from "../../components/PageTransitions.svelte";

  let filteredLessons = [];

  onMount(async () => {
    const {filteredLessonsData} = await axios.get("/api/lesson/" + $selectedCategory);
    filteredLessons = filteredLessonsData;
  });
</script>

<PageTransitions>
  <div class="container">
    <h1>All lessons for {$selectedCategory}</h1>
  </div>
</PageTransitions>
