<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import { userProfile } from "../stores";

  let hideProfileUpdateContainer = true;
  let firstName = "";
  let lastName = "";
  let age = 0;

  let profileData = {};

  onMount(async () => {

    const {data} = await axios.get("/api/profile");
    $userProfile = data;
  });

  async function setProfileChanges() {
    const profile = {
      firstName: firstName,
      lastName: lastName,
      age: age,
    };
    const response = await axios.post('/api/profile', profile);
    $userProfile = [response.data];
    console.log(userProfile);
  }
</script>

<div class="container">
  <h1>Profile</h1>
  <p>Full profile: {JSON.stringify($userProfile)}</p>
  <div class="columns">
    {#each $userProfile as profile}
    <div class="column">
      <p>First name: {profile.firstName}</p>
    </div>

    <div class="column">
      <p>Last name: {profile.lastName}</p>
    </div>

    <div class="column">
      <p>Age: {profile.age}</p>
    </div>
    {/each}
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
