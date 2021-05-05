<script>
  import { uuidKey } from "../stores";
  import PageTransitions from "../components/PageTransitions.svelte";
</script>

<PageTransitions>
  <div class="container">
    <h1>Room {$uuidKey}</h1>
  </div>
</PageTransitions>
