<script>
  import axios from "axios";
  import { link } from "svelte-spa-router";
  import { onMount } from "svelte";
  import { userProfile, lessonsData, user, categoriesData } from "../../stores";
  import ProfileData from "../../components/ProfileData.svelte";
  import LessonList from "../../components/LessonList.svelte";
  import CategoryList from "../../components/CatgoryList.svelte";
  import PageTransitions from "../../components/PageTransitions.svelte";

  let allLessons = false;
  let allCategories = false;
  let errorMessage;

  onMount(async () => {
    try {
      await axios
        .all([
          axios.get("/api/profile/" + $user.username),
          axios.get("/api/lesson/fromUser/" + $user.username),
          axios.get("/api/categories/fromUser/" + $user.username),
        ])
        .then(
          axios.spread((...responses) => {
            ($userProfile = responses[0].data),
              ($lessonsData = responses[1].data),
              ($categoriesData = responses[2].data);
          })
        );
    } catch (error) {
      if (error.response.data.message) {
        errorMessage = error.response.data.message;
      }
    }
  });

  function getAllLessons() {
    allLessons = !allLessons;
  }

  function getAllCategories() {
    allCategories = !allCategories;
  }
</script>

<PageTransitions>
  <div class="container">
    {#if errorMessage}
      <h1>{errorMessage}</h1>
      <a href="/edit-profile" class="button is-link" use:link
            >Edit profile</a
          >
    {:else}
      <div class="columns">
        <div class="column is-one-fifth">
          <ProfileData profileData={$userProfile} />
          <a href="/edit-profile" class="button is-link" use:link
            >Edit profile</a
          >
        </div>
        <div class="column">
          <div class="category-list-header">
            <h1>Added lessons</h1>
            <button class="button is-link" on:click={getAllLessons}
              >Toggle all lessons</button
            >
          </div>
          {#if allLessons}
            <LessonList lessonList={$lessonsData} />
          {:else}
            <LessonList lessonList={$lessonsData.slice(0, 2)} />
          {/if}
        </div>
        <div class="column">
          <div class="category-list-header">
            <h1>Added categories</h1>
            <button class="button is-link" on:click={getAllCategories}
              >Toggle all categories</button
            >
          </div>
          {#if allCategories}
            <CategoryList categoryList={$categoriesData} />
          {:else}
            <CategoryList categoryList={$categoriesData.slice(0, 2)} />
          {/if}
        </div>
      </div>
    {/if}
  </div>
</PageTransitions>

<style>
  .category-list-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
</style>
