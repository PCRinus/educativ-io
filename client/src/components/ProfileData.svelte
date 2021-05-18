<script>
  let svgPath = "images/male-user.svg";
  export let profileData;
</script>

{#if profileData.length === 0}
  <p>No profile has been set for this user</p>
{:else}
  <img src={svgPath} alt="User profile" />
  <p>First name: {profileData.firstName}</p>
  <p>Last name: {profileData.lastName}</p>
  <p>Age: {profileData.age}</p>
  <!-- {#if $user.username === $userName}
    <button
      class="button is-link"
      on:click={() =>
        (hideProfileUpdateContainer = !hideProfileUpdateContainer)}
      >Toggle update profile</button
    >
  {/if} -->
{/if}

<style>
  img {
    height: 10rem;
    width: 10rem;
  }
</style>
