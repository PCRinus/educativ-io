<script>
  import Router, { push } from "svelte-spa-router";
  import Navbar from "./layout/Navbar.svelte";
  import Footer from "./layout/Footer.svelte";
  import Home from "./pages/Home.svelte";
  import Dashboard from "./pages/Dashboard.svelte";
  import Signup from "./pages/Signup.svelte";
  import Login from "./pages/Login.svelte";
  import Room from "./pages/Room.svelte";
  import Profile from "./pages/Profile.svelte";
  import Categories from "./pages/Categories.svelte";
  import Lesson from "./pages/Lesson/Lesson.svelte";
  import AddLesson from "./pages/Lesson/AddLesson.svelte";
  import ListLessons from "./pages/Lesson/ListLessons.svelte";
  import { onMount } from "svelte";
  import { user } from "./stores";

  const routes = {
    "/": Home,
    "/dashboard": Dashboard,
    "/signup": Signup,
    "/login": Login,
    "/profile": Profile,
    "/room/:uuidKey": Room,
    "/categories": Categories,
    "/categories/:categoryName/lessons": Lesson,
    "/lessons": ListLessons,
    "/new-lesson": AddLesson,
  };

  onMount(() => {
    if ($user === null) {
      push("/");
    }
  });
</script>

<Navbar />
<div class="content">
  <Router {routes} />
</div>
<Footer />
