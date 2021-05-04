<script>
  import axios from "axios";
  import { push } from "svelte-spa-router";
  import { user } from "../stores";
  let isActive = false;

  async function logout() {
    await axios.post("/api/auth/logout");
    $user = null;
    push("/");
  }
</script>

<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="#/">Educativ.io </a>

    <!-- svelte-ignore a11y-invalid-attribute -->
    <span
      href="#"
      role="button"
      class="navbar-burger"
      aria-label="menu"
      aria-expanded="false"
      data-target="navbarBasicExample"
      class:is-active={isActive}
      on:click={() => (isActive = !isActive)}
    >
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
    </span>
  </div>

  <div class="navbar-menu" class:is-active={isActive}>
      <div class="navbar-start">
        {#if $user}
        <a href="#/dashboard" class="navbar-item"> Dashboard </a>
        <a href="#/profile" class="navbar-item"> Profile </a>
        {/if}
        <a href="#/categories" class="navbar-item">Categories</a>
      </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          {#if $user}
            <button class="button is-light" on:click={logout}>Logout</button>
          {:else}
            <a href="#/signup" class="button is-primary">
              <strong>Sign up</strong>
            </a>
            <a href="#/login" class="button is-light"> Log in </a>
          {/if}
        </div>
      </div>
    </div>
  </div>
</nav>
