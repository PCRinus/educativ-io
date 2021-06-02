<script>
  import { uuidKey, uuidRedirectButton } from "../../stores";
  import { onDestroy } from "svelte";
  import VideoChat from "./VideoChat.svelte";
  import PageTransitions from "../../components/PageTransitions.svelte";

  let localUrl =
    "https://tokbox.com/embed/embed/ot-embed.js?embedId=ca26ca5b-c90e-42bb-8559-6436b932993a&room=DEFAULT_ROOM&iframe=true";
  let serverUrl =
    "https://tokbox.com/embed/embed/ot-embed.js?embedId=8bbd5dc5-e360-40bc-afef-702113afdc1c&room=DEFAULT_ROOM&iframe=true";

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
