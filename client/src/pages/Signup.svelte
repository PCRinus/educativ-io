<script>
  import axios from "axios";
  import { user, you } from "../stores";
  import { push } from "svelte-spa-router";
  import PageTransitions from "../components/PageTransitions.svelte";

  let username;
  let password;
  let confirmPassword;
  let errorMessage;

  $: if (username) {
    errorMessage: null;
  }

  function checkIfPasswordsMatch(password, confirmPassword) {
    if (password !== confirmPassword) {
      errorMessage = "Passwords don't match";
      throw new Error(errorMessage);
    }
  }

  function checkIfPasswodHasLength(password) {
    if (password.length < 4) {
      errorMessage = "Password is too short";
      throw new Error(errorMessage);
    }
  }

  async function signup() {
    try {
      checkIfPasswordsMatch(password, confirmPassword);
      checkIfPasswodHasLength(password);
      const { data } = await axios.post("/api/auth/signup", {
        username,
        password,
      });
      $user = data.user;
      $you = data.user.username;
      push("/dashboard");
    } catch (error) {
      if (error.response.data.message === "User already exists") {
        username = "";
        password = "";
        errorMessage = "Username is already taken";
      }
    }
  }
</script>

<PageTransitions>
  <div class="container container-custom section">
    <div class="section">
      <h1 class="title">Sign Up</h1>
      <hr />

      <form on:submit|preventDefault={signup}>
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
            {#if errorMessage}
              <p class="help is-danger">{errorMessage}</p>
            {/if}
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
              required
            />
          </div>
        </div>

        <div class="field">
          <label for="confirm-password" class="label">Confirm password</label>
          <div class="control">
            <input
              type="password"
              class="input"
              name="confirm-password"
              bind:value={confirmPassword}
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
