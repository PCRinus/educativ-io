<script>
  import axios from "axios";
  import { jsPDF } from "jspdf";
  import html2canvas from "html2canvas";
  import moment from "moment";
  import { onMount } from "svelte";
  import { currentLessonData, selectedLessonSlug } from "../../stores";
  import marked from "marked";
  import PageTransitions from "../../components/PageTransitions.svelte";

  let markdown;

  const pdfDocument = new jsPDF();

  function downloadLessonPDF() {
    let text = document.getElementById("test");
    console.log(text);
    console.log(markdown);
    pdfDocument.html(text, {
      callback: function (pdfDocument) {
        pdfDocument.save(
          $currentLessonData.title +
            "-" +
            moment($currentLessonData.createdAt).format("Do-MMMM-YYYY") +
            ".pdf"
        );
      },
      x: 10,
      y: 10,
    });
  }

  onMount(async () => {
    const { data } = await axios.get("/api/lesson/" + $selectedLessonSlug);
    $currentLessonData = data;
    markdown = marked($currentLessonData.markdown);
  });
</script>

<PageTransitions>
  <div class="container container-custom">
    <h1>{$currentLessonData.title}</h1>
    <h4>
      {$currentLessonData.description} - {moment(
        $currentLessonData.createdAt
      ).format("Do MMMM YYYY")}
    </h4>
    <p>{@html markdown}</p>
    <button class="button is-link" id="print-button" on:click={downloadLessonPDF}
      ><i class="fas fa-download" /> Download lesson PDF</button
    >
    <div id="test">
      <p>Here is some long text</p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae
        luctus mauris. Pellentesque aliquam turpis a ligula luctus, ac aliquet
        nisl viverra. Nulla augue mauris, lobortis id aliquam vitae, dignissim
        rhoncus augue. Duis aliquam pharetra sodales. Ut faucibus molestie odio,
        vel vestibulum sapien eleifend in. Nullam consequat ipsum ac magna
        iaculis, eget rutrum orci tempor. Proin at enim facilisis, ullamcorper
        urna eu, cursus arcu. Sed ac tincidunt libero. Mauris maximus libero
        sapien, vel dignissim orci vulputate in.
      </p>
      <p>More content</p>
      <p>Some more very very very long text</p>
    </div>
  </div>
</PageTransitions>

<style>
  .fas {
    margin-right: 1ch;
  }
</style>
