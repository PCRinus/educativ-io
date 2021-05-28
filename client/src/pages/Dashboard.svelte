<script>
  import { push, link } from "svelte-spa-router";
  import { uuidKey, uuidRedirectButton } from "../stores";
  import { v4 as uuidv4 } from "uuid";
  import { onDestroy } from "svelte";
  import PageTransitions from "../components/PageTransitions.svelte";

  let tooltip = "Copy room code";

  function generateUUID() {
    $uuidKey = uuidv4();
    $uuidRedirectButton = true;
  }

  function redirectToRoom() {
    push("/room/" + $uuidKey);
  }

  function joinRoom() {
    push("/join-room");
  }

  function copyMeetingRoomCode() {
    document.getElementById("roomID").select();
    let asdf = document.execCommand("copy");
    console.log(asdf);
  }

  onDestroy(() => {
    $uuidKey = "";
    $uuidRedirectButton = false;
  });
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
      <p>Please generate a key or join a room</p>
    {:else}
      <p id="roomID">
        {$uuidKey}
        <i
          class="far fa-copy"
          on:click={copyMeetingRoomCode}
          data-tooltip={tooltip}
        />
      </p>
    {/if}
    <div class="columns">
      <div class="column">
        <button class="button is-link" on:click={joinRoom}>
          Join an existing room
        </button>
      </div>

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
  </div>
</PageTransitions>

<style>
  .far {
    color: #3273dc;
  }
  .far:hover {
    color: #363636;
  }
</style>
