<script>
  import { push } from "svelte-spa-router";
  import { uuidKey } from "../stores";
  import { v4 as uuidv4 } from "uuid";

  function generateUUID() {
    $uuidKey = uuidv4();
  }

  function redirectToRoom() {
    push("/room/" + $uuidKey);
  }
</script>

<div class="container">
  <div class="columns">
    <div class="column">
      <button class="button is-link" on:click={generateUUID}>
        Generate Room
      </button>
    </div>

    <div class="column">
      <button class="button is-link" on:click={redirectToRoom}>
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
