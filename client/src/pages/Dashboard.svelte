<script>
  import { push, link } from "svelte-spa-router";
  import { uuidKey, uuidRedirectButton } from "../stores";
  import { v4 as uuidv4 } from "uuid";
  import { onDestroy } from "svelte";
  import ClipboardJS from "clipboard";
  import { toast } from "@zerodevx/svelte-toast";
  import PageTransitions from "../components/PageTransitions.svelte";

  new ClipboardJS("#copy-roomID");

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

  function copyKey() {
    toast.push("Copied to clipboard!", {
      theme: {
        "--toastBackground": "#48BB78",
        "--toastProgressBackground": "#2F855A",
      },
    });
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
        <a
          id="all-categories"
          href="/categories"
          class="button is-link"
          use:link>Browse by category</a
        >
      </div>

      <div class="column">
        <a id="all-lessons" href="/lessons" class="button is-link" use:link
          >Browse all available lessons</a
        >
      </div>

      <div class="column">
        <a id="new-lesson" href="/new-lesson" class="button is-link" use:link
          >Add a new lesson</a
        >
      </div>
    </div>
    <h1>Connect to a meeting room:</h1>
    {#if $uuidKey === ""}
      <p>Please generate a key or join a room</p>
    {:else}
      <div
        class="room-id-container has-addons"
        id="copy-roomID"
        data-clipboard-target="#roomID"
        on:click={copyKey}
      >
        <i class="far fa-copy" />
        <p class="room-id" id="roomID" type="text">{$uuidKey}</p>
      </div>
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
  .room-id-container {
    display: flex;
    align-items: center;
    border: 1px solid;
    border-color: #dbdbdb;
    border-radius: 4px;
    padding: 0rem 2ch;
    margin-bottom: 1rem;
    height: 2.5em;
  }

  .room-id {
    padding: 0rem 1ch;
  }
  .room-id-container:hover {
    cursor: pointer;
    background-color: #6feb98a8;
    transition: color ease 0.3s;
  }
</style>
