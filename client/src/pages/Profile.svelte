<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import { userProfile } from "../stores";
  import PageTransitions from "../components/PageTransitions.svelte";

  let hideProfileUpdateContainer = true;
  let firstName = "";
  let lastName = "";
  let age = 0;

  onMount(async () => {
    const { data } = await axios.get("/api/profile");
    $userProfile = data;
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
    <h1>Profile</h1>
    {#if $userProfile.length === 0}
      <p>No profile has been set up yet, add your profile!</p>
    {:else}
      <p>Full profile: {JSON.stringify($userProfile)}</p>
    {/if}
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
      on:click={() =>
        (hideProfileUpdateContainer = !hideProfileUpdateContainer)}
      >Toggle update profile</button
    >
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
