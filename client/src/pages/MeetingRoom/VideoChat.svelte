<script>
  import { onMount } from "svelte";

  import { uuidKey } from "../../stores";
  export let videoUrl;

  let formattedVideoUrl;

  onMount(() => {
    formattedVideoUrl = videoUrl.replace("DEFAULT_ROOM", $uuidKey);
    console.log(formattedVideoUrl);
  });
</script>

<iframe
  src={formattedVideoUrl}
  width="800px"
  height="640px"
  scrolling="auto"
  allow="microphone; camera"
  title="video-chat"
/>
