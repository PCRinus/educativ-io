<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import { userProfile, userName, lessonsData } from "../../stores";
  import ProfileData from "../../components/ProfileData.svelte";
  import LessonList from "../../components/LessonList.svelte";
  import PageTransitions from "../../components/PageTransitions.svelte";

  onMount(async () => {
    await axios
      .all([
        axios.get("/api/profile/" + $userName),
        axios.get("/api/lesson/fromUser/" + $userName),
      ])
      .then(
        axios.spread((...responses) => {
          ($userProfile = responses[0].data),
            ($lessonsData = responses[1].data.slice(0, 2));
        })
      );
  });
</script>

<PageTransitions>
  <div class="container container-custom">
    <div class="columns">
      <div class="column is-one-third">
        <ProfileData profileData={$userProfile} />
      </div>
      <div class="column">
        <h1>Added lessons</h1>
        <LessonList lessonList={$lessonsData} />
      </div>
    </div>
  </div>
</PageTransitions>
