<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import { userProfile, userName, lessonsData, categoriesData } from "../../stores";
  import ProfileData from "../../components/ProfileData.svelte";
  import LessonList from "../../components/LessonList.svelte";
  import CategoryList from "../../components/CatgoryList.svelte";
  import PageTransitions from "../../components/PageTransitions.svelte";

  onMount(async () => {
    await axios
      .all([
        axios.get("/api/profile/" + $userName),
        axios.get("/api/lesson/fromUser/" + $userName),
        axios.get("/api/categories/fromUser/" + $userName),
      ])
      .then(
        axios.spread((...responses) => {
          ($userProfile = responses[0].data),
            ($lessonsData = responses[1].data),
            ($categoriesData = responses[2].data);
        })
      );
  });
</script>

<PageTransitions>
  <div class="container">
    <div class="columns">
      <div class="column is-one-fifth">
        <ProfileData profileData={$userProfile} />
      </div>
      <div class="column">
        <h1>Latest added lessons</h1>
        <LessonList lessonList={$lessonsData} />
      </div>
      <div class="column">
        <h1>Latest added categories</h1>
        <CategoryList categoryList={$categoriesData} />
      </div>
    </div>
  </div>
</PageTransitions>
