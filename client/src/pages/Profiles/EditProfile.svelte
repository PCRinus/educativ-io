<script>
  import axios from "axios";
  import { push } from "svelte-spa-router";
  import { userProfile } from "../../stores";
  import PageTransitions from "../../components/PageTransitions.svelte";

  let firstName = "";
  let lastName = "";
  let age = 0;

  async function setProfileChanges() {
    const profile = {
      firstName: firstName,
      lastName: lastName,
      age: age,
    };
    await axios.post("/api/profile", profile);
    push("/you");
  }
</script>

<PageTransitions>
  <div class="container container-custom">
    <h1>Edit profile</h1>
    <form on:submit|preventDefault={setProfileChanges}>
      <div class="field">
        <label for="" class="label">First Name</label>
        <input
          type="text"
          class="input"
          bind:value={firstName}
          placeholder={$userProfile.firstName}
          required
        />
      </div>

      <div class="field">
        <label for="" class="label">Last Name</label>
        <input
          type="text"
          class="input"
          bind:value={lastName}
          placeholder={$userProfile.lastName}
          required
        />
      </div>

      <div class="field">
        <label for="" class="label">Age</label>
        <input
          type="number"
          class="input"
          min="14"
          bind:value={age}
          placeholder={$userProfile.age}
          required
        />
      </div>

      <div class="control">
        <input type="submit" class="button is-link" value="Update profile" />
      </div>
    </form>
  </div>
</PageTransitions>
