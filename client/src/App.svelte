<script>
  import { onMount } from "svelte";
  import { user } from "./stores";
  import Router, { push } from "svelte-spa-router";
  import Navbar from "./layout/Navbar.svelte";
  import Footer from "./layout/Footer.svelte";
  import Home from "./pages/Home.svelte";
  import Dashboard from "./pages/Dashboard.svelte";
  import Signup from "./pages/Signup.svelte";
  import Login from "./pages/Login.svelte";
  import Settings from "./pages/Settings.svelte";
  import Room from "./pages/Room.svelte";
  import Categories from "./pages/Categories.svelte";
  import Profile from "./pages/Profile.svelte";
  import OwnProfile from "./pages/OwnProfile.svelte";
  import AddLesson from "./pages/Lesson/AddLesson.svelte";
  import AddLessonMarkdown from "./pages/Lesson/AddLessonMarkdown.svelte";
  import ListAllLessons from "./pages/Lesson/ListAllLessons.svelte";
  import ListAllLessonsInsideCategory from "./pages/Lesson/ListAllLessonsInsideCategory.svelte";
  import ListSpecificLesson from "./pages/Lesson/ListSpecificLesson.svelte";

  const routes = {
    "/": Home,
    "/dashboard": Dashboard,
    "/signup": Signup,
    "/login": Login,
    "/settings": Settings,
    "/profile/you": OwnProfile,
    "/profile/:userName": Profile,
    "/room/:uuidKey": Room,
    "/categories": Categories,
    "/new-lesson": AddLesson,
    "/new-lesson/markdown": AddLessonMarkdown,
    "/lessons": ListAllLessons,
    "/categories/:categoryName": ListAllLessonsInsideCategory,
    "/categories/:categoryName/:slug": ListSpecificLesson,
    "/lessons/:slug": ListSpecificLesson,
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
