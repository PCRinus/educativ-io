const { Router } = require("express");
const puppeteer = require("puppeteer");
const {
  localURL,
  deploymentURL,
  pdfAdminUser,
  pdfAdminPass,
} = require("../config");
const { ensureLogin } = require("../middlewares/auth");
const fs = require("fs");

const router = Router();

router.post("/", ensureLogin, async (req, res) => {
  try {
    const { lessonURL, lessonSlug } = req.body;
    const path = "./downloads/" + lessonSlug + ".pdf";

    fs.access(path, fs.F_OK, (err) => {
      if (!err) {
        res.contentType("application/pdf");
        res.download(path);
        console.log("Sent");
      } else {
        generatePDF(res, lessonURL, lessonSlug);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

async function generatePDF(res, lessonURL, lessonSlug) {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-dev-shm-usage"],
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    if (process.env.NODE_ENV === "production") {
      await page.goto(deploymentURL, {
        waitUntil: "networkidle2",
      });
    } else {
      await page.goto(localURL, {
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
    await page.waitForTimeout(1500);

    await page.addStyleTag({
      content:
        "nav { display: none} footer {display: none} #download-pdf {display: none} #cookie-banner {display: none}",
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
}

module.exports = router;
