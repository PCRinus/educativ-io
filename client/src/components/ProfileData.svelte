<script>
  let svgPath = "images/male-user.svg";
  export let profileData;
</script>

{#if profileData.length === 0}
  <p>No profile has been set for this user</p>
{:else}
  <img src={svgPath} alt="User profile" />
  <h3>Full name: {profileData.firstName + ' ' +  profileData.lastName}</h3>
  <h3>Age: {profileData.age}</h3>
{/if}

<style>
  img {
    height: 15rem;
    width: 15rem;
    margin: 0 auto;
  }
</style>
