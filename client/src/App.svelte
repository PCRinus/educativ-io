<script>
  import Router from "svelte-spa-router";
  import Navbar from "./layout/Navbar.svelte";
  import Home from "./pages/Home.svelte";
  import Dashboard from "./pages/Dashboard.svelte";
  import Profile from "./pages/Profile.svelte";
  import Signup from "./pages/Signup.svelte";
  import Login from "./pages/Login.svelte";
  import Room from "./pages/Room.svelte";

  const routes = {
    "/": Home,
    "/dashboard": Dashboard,
    "/profile": Profile,
    "/signup": Signup,
    "/login": Login,
    "/room/:uuidKey": Room,
  };
</script>

<Navbar />

<Router {routes} />
