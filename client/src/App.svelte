<script>
  import Router, { push } from "svelte-spa-router";
  import Navbar from "./layout/Navbar.svelte";
  import Home from "./pages/Home.svelte";
  import Dashboard from "./pages/Dashboard.svelte";
  import ViewProfile from "./pages/profile/ViewProfile.svelte";
  import Signup from "./pages/Signup.svelte";
  import Login from "./pages/Login.svelte";
  import Room from "./pages/Room.svelte";
  import UpdateProfile from "./pages/profile/UpdateProfile.svelte";
  import { onMount } from "svelte";
  import { user } from "./stores";

  const routes = {
    "/": Home,
    "/dashboard": Dashboard,
    "/profile": ViewProfile,
    "/updateProfile": UpdateProfile,
    "/signup": Signup,
    "/login": Login,
    "/room/:uuidKey": Room,
  };

  onMount(() => {
    if ($user === null) {
      push("/");
    }
  });
</script>

<Navbar />

<Router {routes} />
