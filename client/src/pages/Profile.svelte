<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import { setRequestURL } from "../../../middlewares/url";

  let hideProfileUpdateContainer = true;
  let firstName = "";
  let lastName = "";
  let age = 0;
  let getProfileUrl = '';

  let profileData = [];

  onMount(async () => {
    getProfileUrl = setRequestURL("/api/profile");
    const {data} = await axios.get(getProfileUrl);
    profileData = data;
    console.log(getProfileUrl)
    console.log(profileData)
  });

  function setProfileChanges() {}
</script>

<div class="container">
  <h1>Profile</h1>
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

      <p>{firstName}</p>
      {JSON.stringify(profileData)}
    </form>
  </div>
</div>

<style>
  .show-profile-container {
    display: none;
  }
</style>
