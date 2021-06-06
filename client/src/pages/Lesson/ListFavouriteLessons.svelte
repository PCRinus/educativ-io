<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import { favouriteLessons } from "../../stores";
  import PageTransitions from "../../components/PageTransitions.svelte";
  import LessonList from "../../components/LessonList.svelte";

  onMount(async () => {
    const { data } = await axios.get("/api/lesson/fromFavourites/true");
    $favouriteLessons = data;
  });
</script>

<PageTransitions>
  <div class="container container-custom section">
    <h1>Favourites</h1>
    <LessonList lessonList={$favouriteLessons} />
  </div>
</PageTransitions>
