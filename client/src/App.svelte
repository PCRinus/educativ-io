<script>
  import { SvelteToast } from "@zerodevx/svelte-toast";
  import { onMount } from "svelte";
  import { user } from "./stores";
  import Router, { push } from "svelte-spa-router";
  import Navbar from "./layout/Navbar.svelte";
  import Footer from "./layout/Footer.svelte";
  import Home from "./pages/Home.svelte";
  import Cookie from "./layout/Cookie.svelte";
  import Dashboard from "./pages/Dashboard.svelte";
  import Signup from "./pages/Signup.svelte";
  import Login from "./pages/Login.svelte";
  import Settings from "./pages/Settings.svelte";
  import Room from "./pages/MeetingRoom/Room.svelte";
  import JoinMeetingRoom from "./pages/MeetingRoom/JoinMeetingRoom.svelte";
  import Categories from "./pages/Categories/Categories.svelte";
  import AddCategory from "./pages/Categories/AddCategory.svelte";
  import UserProfile from "./pages/Profiles/UserProfile.svelte";
  import PersonalProfile from "./pages/Profiles/PersonalProfile.svelte";
  import AddLesson from "./pages/Lesson/AddLesson.svelte";
  import AddLessonMarkdown from "./pages/Lesson/AddLessonMarkdown.svelte";
  import ListAllLessons from "./pages/Lesson/ListAllLessons.svelte";
  import ListAllLessonsInsideCategory from "./pages/Lesson/ListAllLessonsInsideCategory.svelte";
  import ListSpecificLesson from "./pages/Lesson/ListSpecificLesson.svelte";
  import ListFavouriteLessons from "./pages/Lesson/ListFavouriteLessons.svelte";
  import EditProfile from "./pages/Profiles/EditProfile.svelte";
  import TextChat from "./pages/MeetingRoom/TextChat.svelte";

  const routes = {
    "/": Home,
    "/dashboard": Dashboard,
    "/signup": Signup,
    "/login": Login,
    "/settings": Settings,
    "/you": PersonalProfile,
    "/favourites": ListFavouriteLessons,
    "/edit-profile": EditProfile,
    "/profile/:userName": UserProfile,
    "/join-room": JoinMeetingRoom,
    "/room/:uuidKey": Room,
    "/categories": Categories,
    "/new-category": AddCategory,
    "/new-lesson": AddLesson,
    "/new-lesson/markdown": AddLessonMarkdown,
    "/lessons": ListAllLessons,
    "/categories/:categoryName": ListAllLessonsInsideCategory,
    "/categories/:categoryName/:slug": ListSpecificLesson,
    "/lessons/:slug": ListSpecificLesson,
    "/chat": TextChat,
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
  <SvelteToast
    options={{ reversed: true, duration: 3000, intro: { y: 192 } }}
  />
  {#if process.env.NODE_ENV === "production"}
    <Cookie />
  {/if}
</div>
<Footer />

<style>
  :root {
    --toastContainerTop: auto;
    --toastContainerBottom: 4rem;
    --toastContainerLeft: auto;
  }
</style>
