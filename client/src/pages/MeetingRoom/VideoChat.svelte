<script>
  import { onMount } from "svelte";
  import { uuidKey } from "../../stores";
  export let videoUrl;

  let clientHeight;
  let navbarHeight;
  let videoClientHeight;
  let formattedVideoUrl;

  onMount(() => {
    clientHeight = document.getElementById("chat-container").offsetHeight;
    navbarHeight = document.getElementById("navbar").offsetHeight;
    videoClientHeight = clientHeight - navbarHeight + "px";
    formattedVideoUrl = videoUrl.replace("DEFAULT_ROOM", $uuidKey);
  });
</script>

<div style="--client-height: {videoClientHeight}">
  <iframe
    src={formattedVideoUrl}
    scrolling="auto"
    allow="microphone; camera"
    title="video-chat"
  />
</div>

<style>
  iframe {
    width: 100%;
    height: var(--client-height);
  }
</style>
