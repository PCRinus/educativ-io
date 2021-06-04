<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import { currentLessonData, selectedLessonSlug } from "../../stores";
  import { toast } from "@zerodevx/svelte-toast";
  import marked from "marked";
  import PageTransitions from "../../components/PageTransitions.svelte";

  let markdown;

  onMount(async () => {
    const { data } = await axios.get("/api/lesson/" + $selectedLessonSlug);
    $currentLessonData = data;
    markdown = marked($currentLessonData.markdown);
  });

  function downloadPDF() {
    toast.push("Generating PDF...", {
      theme: {
        "--toastBackground": "#fb8203",
        "--toastProgressBackground": "#fcb815",
      },
      duration: 5000,
    });
    const lessonData = {
      lessonURL: window.location.href,
      lessonSlug: $selectedLessonSlug,
    };
    return axios.post("/api/pdf", lessonData, {
      responseType: 'arraybuffer',
      headers: {
        Accept: "application/pdf",
      },
    });
  }

  function savePDF() {
    return downloadPDF() // API call
      .then((response) => {
        const blob = new Blob([response.data], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = $selectedLessonSlug + ".pdf";
        link.click();
      })
      .catch((err) => {
        console.log("eroare mica");
      });
  }
</script>

<PageTransitions>
  <div class="container container-custom">
    <h1>{$currentLessonData.title}</h1>
    <h4>{$currentLessonData.description}</h4>
    <h4>{$currentLessonData.createdAt}</h4>
    <p>{@html markdown}</p>
    <button id="download-pdf" class="button is-link" on:click={savePDF}
      ><i class="fas fa-download" /> Download lesson PDF</button
    >
  </div>
</PageTransitions>

<style>
  .fas {
    margin-right: 1ch;
  }
</style>
