<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import { userProfile, lessonsData, user } from "../../stores";
  import ProfileData from "../../components/ProfileData.svelte";
  import LessonList from "../../components/LessonList.svelte";
  import PageTransitions from "../../components/PageTransitions.svelte";

  let hideProfileUpdateContainer = true;
  let firstName = "";
  let lastName = "";
  let age = 0;

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

  async function setProfileChanges() {
    const profile = {
      firstName: firstName,
      lastName: lastName,
      age: age,
    };
    const response = await axios.post("/api/profile", profile);
    $userProfile = [response.data];
    hideProfileUpdateContainer = !hideProfileUpdateContainer;
  }
</script>

<PageTransitions>
  <div class="container container-custom">
    <div class="columns">
      <div class="column is-one-third">
        <ProfileData profileData={$userProfile} />
        <button
          class="button is-link"
          on:click={() =>
            (hideProfileUpdateContainer = !hideProfileUpdateContainer)}
          >Toggle update profile</button
        >
      </div>
      <div class="column">
        <h1>Added lessons</h1>
        <LessonList lessonList={$lessonsData} />
      </div>
    </div>
    <div class:show-profile-container={hideProfileUpdateContainer}>
      <h1>Update your profile</h1>

      <form on:submit|preventDefault={setProfileChanges}>
        <div class="field">
          <label for="" class="label">First Name</label>
          <input type="text" class="input" bind:value={firstName} required />
        </div>

        <div class="field">
          <label for="" class="label">Last Name</label>
          <input type="text" class="input" bind:value={lastName} required />
        </div>

        <div class="field">
          <label for="" class="label">Age Name</label>
          <input
            type="number"
            class="input"
            min="14"
            bind:value={age}
            required
          />
        </div>

        <div class="control">
          <input type="submit" class="button is-link" value="Submit" />
        </div>
      </form>
    </div>
  </div>
</PageTransitions>

<style>
  .show-profile-container {
    display: none;
  }
</style>
