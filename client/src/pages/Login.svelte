<script>
  import axios from "axios";
  import { user } from "../stores";
  import { push } from "svelte-spa-router";
  import { setRequestURL } from "../../../middlewares/url";
  let username;
  let password;
  let errorMessage;

  $: if (username) {
    errorMessage: null;
  }

  async function login() {
    try {
      let signupRequestURL = setRequestURL("/api/auth/login");
      const { data } = await axios.post(signupRequestURL, {
        username,
        password,
      });

      // const { data } = await axios.post("/api/auth/login", {
      //   username,
      //   password,
      // });
      $user = data.user;
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

<div class="container">
  <div class="section">
    <h1 class="title">Log In</h1>
    <hr />
    {#if errorMessage}
      <p class="help is-danger">{errorMessage}</p>
    {/if}
    <form on:submit|preventDefault={login}>
      <div class="field">
        <label for="" class="label">Username</label>
        <div class="control">
          <input
            type="text"
            class="input"
            bind:value={username}
            class:is-danger={errorMessage}
            required
          />
        </div>
      </div>

      <div class="field">
        <label for="" class="label">Password</label>
        <div class="control">
          <input
            type="password"
            class="input"
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
