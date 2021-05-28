<script>
  import { uuidKey, uuidRedirectButton} from "../stores";
  import { onDestroy } from "svelte";
  import PageTransitions from "../components/PageTransitions.svelte";

  onDestroy(() => {
    $uuidKey = "";
    $uuidRedirectButton = false;
  })
</script>

<PageTransitions>
  <div class="container container-custom">
    <h1>Room {$uuidKey}</h1>
  </div>
</PageTransitions>
