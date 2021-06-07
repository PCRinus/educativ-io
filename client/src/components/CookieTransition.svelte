<script>
  import { fade } from "svelte/transition";
  import { cookieBanner } from "../stores";
</script>

{#if $cookieBanner}
  <div transition:fade>
    <slot />
  </div>
{/if}
