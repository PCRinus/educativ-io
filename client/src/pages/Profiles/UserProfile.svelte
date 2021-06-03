<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import {
    userProfile,
    userName,
    lessonsData,
    categoriesData,
  } from "../../stores";
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
          axios.get("/api/profile/" + $userName),
          axios.get("/api/lesson/fromUser/" + $userName),
          axios.get("/api/categories/fromUser/" + $userName),
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
    {:else}
      <div class="columns">
        <div class="column is-one-fifth">
          <ProfileData profileData={$userProfile} />
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
