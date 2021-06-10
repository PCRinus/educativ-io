<script>
  import PageTransitions from "../components/PageTransitions.svelte";
  import { isAuthenticated } from "../stores";
  import { push } from "svelte-spa-router";

  const redirectToHomepage = () => {
    if ($isAuthenticated) {
      push("/dashboard");
    } else {
      push("/");
    }
  };
</script>

<PageTransitions>
  <div class="container container-custom section">
    <h1>Oops.</h1>
    <h2>Unfortunatley, we can't find the page you are looking for.</h2>
    <p>
      It may have expired, or there could be a typo. Maybe you can find what you
      need from our
      {#if $isAuthenticated}
        dashboard
      {:else}
        homepage
      {/if}
    </p>
    <button class="button is-link" on:click={redirectToHomepage}
      >Return to Educativ.io</button
    >
  </div>
</PageTransitions>
 <style>
     h1 {
         font-size: 3rem;
     }
 </style>