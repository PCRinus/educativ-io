<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import { setRequestURL } from "../../../middlewares/url";
  import { userProfile } from "../stores";

  let hideProfileUpdateContainer = true;
  let firstName = "";
  let lastName = "";
  let age = 0;
  let getProfileUrl = setRequestURL("/api/profile");

  let profileData = [];

  onMount(async () => {
    const { data } = await axios.get(getProfileUrl);

    // const {data} = await axios.get("/api/profile");
    $userProfile = data;
  });

  async function setProfileChanges() {
    const profile = {
      firstName: firstName,
      lastName: lastName,
      age: age,
    };
    const response = await axios.post(getProfileUrl, profile);
    $userProfile = [response.data];
  }
</script>

<div class="container">
  <h1>Profile</h1>
  <div class="columns">
    <div class="column">
      <p>First name: {JSON.stringify($userProfile.firstName)}</p>
    </div>

    <div class="column">
      <p>First name: {JSON.stringify($userProfile.lastName)}</p>
    </div>

    <div class="column">
      <p>First name: {JSON.stringify($userProfile.age)}</p>
    </div>
  </div>
  <button
    class="button is-link"
    on:click={() => (hideProfileUpdateContainer = !hideProfileUpdateContainer)}
    >Toggle update profile</button
  >
  <div
    class="profile-input-container"
    class:show-profile-container={hideProfileUpdateContainer}
  >
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
        <input type="number" class="input" min="14" bind:value={age} required />
      </div>

      <div class="control">
        <input type="submit" class="button is-link" value="Submit" />
      </div>
    </form>
  </div>
</div>

<style>
  .show-profile-container {
    display: none;
  }
</style>
