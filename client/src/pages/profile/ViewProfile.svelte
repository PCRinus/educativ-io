<script>
  import axios from "axios";
  import { userProfile, user } from "../../stores";
  import { push } from "svelte-spa-router";
  import { onMount } from 'svelte';
  import { setRequestURL } from "../../../../middlewares/url";

  onMount(async () => {
    console.log($user);
    let getProfileUrl = setRequestURL("/api/profile");
    const {data} = await axios.get(getProfileUrl);
    $userProfile = data;
  });
</script>

<div class="container">
  <h1>Profile</h1>
  <a href="#/updateProfile" class="button is-link">Update the profile</a>
  <h1>{JSON.stringify($userProfile)}</h1>
</div>
