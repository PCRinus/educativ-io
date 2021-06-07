<script>
  import { cookieBanner } from "../stores";
  import CookieTransition from "../components/CookieTransition.svelte";

  function cookiesAccepted() {
    $cookieBanner = false;
  }
</script>

<CookieTransition>
  <div id="cookie-banner" class="container section">
    <h2>🍪 Cookie disclamer</h2>
    <p>
      We don't use any cookies for tracking, so you don't need to consent to any cookie
      usage!
    </p>
    <button class="button is-link" on:click={cookiesAccepted}
      ><i class="fas fa-check" /> Accept</button
    >
  </div>
</CookieTransition>

<style>
  #cookie-banner {
    border: 1px #dadada solid;
    border-radius: 5px;
    background-color: #dadada;
    position: fixed;
    left: 50%;
    bottom: 1rem;
    transform: translate(-50%, -50%);
    margin: 0 auto;
  }

  p {
    font-size: 1.2rem;
    font-weight: 500;
  }

  .fas {
    color: white;
    margin-right: 1ch;
  }
</style>
