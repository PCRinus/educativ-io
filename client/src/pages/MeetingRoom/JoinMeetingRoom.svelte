<script>
  import { push } from "svelte-spa-router";
  import { uuidKey } from "../../stores";
  import PageTransitions from "../../components/PageTransitions.svelte";
  import { onDestroy } from "svelte";
  import validator from "validator";

  function joinRoom($uuidKey) {
    if (validator.isUUID($uuidKey, 4)) {
      push("/room/" + $uuidKey);
    } else {
      console.log("not valid");
    }
  }

  onDestroy(() => {
    $uuidKey = "";
  });
</script>

<PageTransitions>
  <div class="container container-custom">
    <h1>Join an existing meeting room</h1>

    <form on:submit|preventDefault={() => joinRoom($uuidKey)}>
      <div class="field">
        <label for="room-key" class="label">Room code</label>
        <input
          type="text"
          class="input"
          name="room-key"
          bind:value={$uuidKey}
          required
          placeholder="Meeting room key"
        />
      </div>

      <div class="control">
        <input type="submit" class="button is-link" value="Join room" />
      </div>
    </form>
  </div>
</PageTransitions>
