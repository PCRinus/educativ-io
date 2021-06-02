<script>
  import axios from "axios";
  import { user, you, userProfile } from "../stores";
  import { push } from "svelte-spa-router";
  import PageTransitions from "../components/PageTransitions.svelte";
  let username;
  let password;
  let errorMessage;

  $: if (username) {
    errorMessage: null;
  }

  async function login() {
    try {
      const { data } = await axios.post("/api/auth/login", {
        username,
        password,
      });
      $user = data.user;
      $you = data.user.username;
      push("/dashboard");
    } catch (error) {
      if (error.response.status === 401) {
        username = "";
        password = "";
        errorMessage = "Invalid credentials";
      }
    }
  }
</script>

<PageTransitions>
  <div class="container container-custom">
    <div class="section">
      <h1 class="title">Log In</h1>
      <hr />
      {#if errorMessage}
        <p class="help is-danger">{errorMessage}</p>
      {/if}
      <form on:submit|preventDefault={login}>
        <div class="field">
          <label for="username" class="label">Username</label>
          <div class="control">
            <input
              type="text"
              class="input"
              name="username"
              bind:value={username}
              class:is-danger={errorMessage}
              required
            />
          </div>
        </div>

        <div class="field">
          <label for="password" class="label">Password</label>
          <div class="control">
            <input
              type="password"
              class="input"
              name="password"
              bind:value={password}
              class:is-danger={errorMessage}
              required
            />
          </div>
        </div>

        <div class="control">
          <input type="submit" class="button is-info is-light" value="Submit" />
        </div>
      </form>
    </div>
  </div>
</PageTransitions>
