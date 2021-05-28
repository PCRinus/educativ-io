<script>
  import { push, link } from "svelte-spa-router";
  import { uuidKey, uuidRedirectButton } from "../stores";
  import { v4 as uuidv4 } from "uuid";
  import PageTransitions from "../components/PageTransitions.svelte";

  function generateUUID() {
    $uuidKey = uuidv4();
    $uuidRedirectButton = true;
  }

  function redirectToRoom() {
    push("/room/" + $uuidKey);
  }
</script>

<PageTransitions>
  <div class="container container-custom">
    <h1>Browse available lessons:</h1>
    <div class="columns">
      <div class="column">
        <a href="/categories" class="button is-link" use:link
          >Browse by category</a
        >
      </div>

      <div class="column">
        <a href="/lessons" class="button is-link" use:link
          >Browse all available lessons</a
        >
      </div>

      <div class="column">
        <a href="/new-lesson" class="button is-link" use:link
          >Add a new lesson</a
        >
      </div>
    </div>
    <h1>Connect to a meeting room:</h1>
    {#if $uuidKey === ""}
      <h1>Please generate a key or join a room</h1>
    {:else}
      <h1>{$uuidKey}</h1>
    {/if}
    <div class="columns">
      <div class="column">
        <button class="button is-link" on:click={generateUUID}>
          Generate Room
        </button>
      </div>

      <div class="column">
        <button
          class="button is-link"
          on:click={redirectToRoom}
          disabled={!$uuidRedirectButton}
        >
          Redirect to meeting room
        </button>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <form action="">
          <div class="field">
            <input type="text" class="input" bind:value={$uuidKey} required />
          </div>
        </form>
      </div>

      <div class="column">
        <button
          class="button is-link"
          on:click={redirectToRoom}
          disabled={!$uuidRedirectButton}
        >
          Join meeting room
        </button>
      </div>
    </div>
  </div>
</PageTransitions>
