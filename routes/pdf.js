const { Router } = require("express");
const puppeteer = require("puppeteer");
const { pdfAdminUser, pdfAdminPass } = require("../config");
const { ensureLogin } = require("../middlewares/auth");

const router = Router();

router.post("/", ensureLogin, async (req, res) => {
  try {
    const { lessonURL, lessonSlug } = req.body;
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-dev-shm-usage"],
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    if (process.env.NODE_ENV === "production") {
      await page.goto("https://educativ-io.herokuapp.com/#/", {
        waitUntil: "networkidle2",
      });
    } else {
      await page.goto("http://localhost:8080/#/", {
        waitUntil: "networkidle2",
      });
    }

    await page.click("#login");
    await page.type("#username", pdfAdminUser);
    await page.type("#password", pdfAdminPass);
    await page.click("#login-button");

    await page.waitForSelector("#all-lessons");
    await page.click("#all-lessons");
    await page.waitForSelector("#" + lessonSlug);
    await page.click("#" + lessonSlug);
    await page.waitForTimeout(1000);
    // await gotoLesson(page, lessonSlug);

    // await page.goto(lessonURL, {
    //   waitUntil: "networkidle2",
    // });
    console.log(lessonURL);
    await page.addStyleTag({
      content:
        "nav { display: none} footer {display: none} #download-pdf {display: none}",
    });
    const generatedPDF = await page.pdf({
      path: "downloads/" + lessonSlug + ".pdf",
      format: "a4",
      margin: {
        top: "20px",
        bottom: "40px",
        left: "20px",
        right: "20px",
      },
    });

    await browser.close();

    res.contentType("application/pdf");
    res.send(generatedPDF);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
