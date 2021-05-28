<script>
  import { uuidKey, uuidRedirectButton } from "../stores";
  import { onDestroy } from "svelte";
  import PageTransitions from "../components/PageTransitions.svelte";

  onDestroy(() => {
    $uuidKey = "";
    $uuidRedirectButton = false;
  });
</script>

<PageTransitions>
  <div class="container container-custom">
    <h1>Room {$uuidKey}</h1>
    <!-- <div id="otEmbedContainer" style="width:800px; height:640px" />
    <script
      src="https://tokbox.com/embed/embed/ot-embed.js?embedId=3960683f-27f3-47ca-8d12-2f5ee0cb181d&room={$uuidKey}%22%3E"></script>
  </div> -->

    <iframe
      src="https://tokbox.com/embed/embed/ot-embed.js?embedId=dc381aeb-37e5-43c2-ba95-495863cf8fad&room={$uuidKey}&iframe=true"
      width="800px"
      height="640px"
      scrolling="auto"
      allow="microphone; camera"
      title="video-chat"
    />
  </div></PageTransitions
>
