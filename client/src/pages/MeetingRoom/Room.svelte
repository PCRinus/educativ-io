<script>
  import { uuidKey, uuidRedirectButton } from "../../stores";
  import { onDestroy } from "svelte";
  import VideoChat from "./VideoChat.svelte";
  import PageTransitions from "../../components/PageTransitions.svelte";

  let localUrl =
    "https://tokbox.com/embed/embed/ot-embed.js?embedId=3960683f-27f3-47ca-8d12-2f5ee0cb181d&room=DEFAULT_ROOM&iframe=true";
  let serverUrl =
    "https://tokbox.com/embed/embed/ot-embed.js?embedId=dc381aeb-37e5-43c2-ba95-495863cf8fad&room=DEFAULT_ROOM&iframe=true";

  onDestroy(() => {
    $uuidKey = "";
    $uuidRedirectButton = false;
  });
</script>

<PageTransitions>
  <div class="container container-custom">
    {#if process.env.NODE_ENV === "production"}
      <VideoChat videoUrl={serverUrl} />
    {:else}
      <VideoChat videoUrl={localUrl} />
    {/if}
  </div></PageTransitions
>
