<script>
  import axios from "axios";
  import { push, link } from "svelte-spa-router";
  import { user } from "../stores";
  let isActive = false;

  async function logout() {
    await axios.post("/api/auth/logout");
    $user = null;
    push("/");
  }

</script>

<nav id="navbar" class="navbar" role="navigation" aria-label="main navigation">
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
        <a href="/dashboard" use:link class="navbar-item"> Dashboard </a>
        <a href="/you" use:link class="navbar-item"> Profile </a>
        <!-- <a href="/favourites" use:link class="navbar-item"> Favourites </a> -->
      {/if}
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        {#if $user}
          <h1 class="navbar-greeting">Hello, {$user.username}!</h1>
        {/if}
        <div class="buttons">
          {#if $user}
            <button class="button is-danger is-light" on:click={logout}>Logout</button>
          {:else}
            <a href="/signup" use:link class="button is-primary">
              <strong>Sign up</strong>
            </a>
            <a href="/login" use:link class="button is-light"> Log in </a>
          {/if}
        </div>
      </div>
    </div>
  </div>
</nav>

<style>
  .navbar-greeting {
    margin: 0 1rem;
  }
</style>
