<script>
  import { push } from "svelte-spa-router";
  import { uuidKey } from "../../stores";
  import PageTransitions from "../../components/PageTransitions.svelte";

  function joinRoom($uuidKey) {
    push("/room/" + $uuidKey);
  }
</script>

<PageTransitions>
  <div class="container container-custom">
    <h1>Join an existing meeting room</h1>

    <form on:submit|preventDefault={() => joinRoom($uuidKey)}>
      <div class="field">
        <label for="" class="label">Room code</label>
        <input type="text" class="input" bind:value={$uuidKey} required />
      </div>

      <div class="control">
        <input type="submit" class="button is-link" value="Join room" />
      </div>
    </form>
  </div>
</PageTransitions>
