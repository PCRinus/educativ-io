<script>
  import axios from "axios";
  import { link } from "svelte-spa-router";
  import { onMount } from "svelte";
  import { userProfile, lessonsData, user } from "../../stores";
  import ProfileData from "../../components/ProfileData.svelte";
  import LessonList from "../../components/LessonList.svelte";
  import PageTransitions from "../../components/PageTransitions.svelte";

  onMount(async () => {
    await axios
      .all([
        axios.get("/api/profile/" + $user.username),
        axios.get("/api/lesson/fromUser/" + $user.username),
      ])
      .then(
        axios.spread((...responses) => {
          ($userProfile = responses[0].data),
            ($lessonsData = responses[1].data);
        })
      );
  });
</script>

<PageTransitions>
  <div class="container container-custom">
    <div class="columns">
      <div class="column is-one-third">
        <ProfileData profileData={$userProfile} />
        <a href="/edit-profile" class="button is-link" use:link>Edit profile</a>
      </div>
      <div class="column">
        <h1>Added lessons</h1>
        <LessonList lessonList={$lessonsData} />
      </div>
    </div>
  </div>
</PageTransitions>
