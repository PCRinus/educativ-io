<script>
    import Router from "svelte-spa-router";
    import Home from "./Pages/Home.svelte";
    import Dashboard from "./Pages/Dashboard.svelte";
    import Profile from "./Pages/Profile.svelte"
    import Signup from "./Pages/Signup.svelte";

    const routes = {
        "/": Home,
        "/dashboard": Dashboard,
        "/profile": Profile,
        "/signup": Signup
    }
</script>

<Router {routes}/>