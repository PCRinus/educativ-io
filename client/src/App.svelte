<script>
  import Router, { push } from "svelte-spa-router";
  import Navbar from "./layout/Navbar.svelte";
  import Home from "./pages/Home.svelte";
  import Dashboard from "./pages/Dashboard.svelte";
  import Signup from "./pages/Signup.svelte";
  import Login from "./pages/Login.svelte";
  import Room from "./pages/Room.svelte";
  import { onMount } from "svelte";
  import { user } from "./stores";
  import Profile from "./pages/Profile.svelte";
  import Categories from "./pages/Categories.svelte";
  import Lessons from "./pages/Lessons.svelte";

  const routes = {
    "/": Home,
    "/dashboard": Dashboard,
    "/signup": Signup,
    "/login": Login,
    "/profile": Profile,
    "/room/:uuidKey": Room,
    "/categories": Categories,
    "/categories/:categoryName": Lessons,
  };

  onMount(() => {
    if ($user === null) {
      push("/");
    }
  });
</script>

<Navbar />

<Router {routes} />
