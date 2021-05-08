<script>
  import { push } from "svelte-spa-router";
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
  <div class="container">
    <h1>Browse available lessons:</h1>
    <div class="columns">
      <div class="column">
        <a href="#/categories" class="button is-link">Browse by category</a>
      </div>

      <div class="column">
        <a href="#/lessons" class="button is-link"
          >Browse all available lessons</a
        >
      </div>

      <div class="column">
        <a href="#/new-lesson" class="button is-link">Add a new lesson</a>
      </div>
    </div>
    <h1>Connect to a meeting room:</h1>
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

      <div class="column">
        {#if $uuidKey === ""}
          <p>Please generate a key</p>
        {:else}
          <p>{$uuidKey}</p>
        {/if}
      </div>
    </div>
  </div>
</PageTransitions>
