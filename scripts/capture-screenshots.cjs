const puppeteer = require("puppeteer-core");
const fs = require("fs");
const path = require("path");

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUT = path.join(__dirname, "../public/screenshots");

const captures = [
  {
    folder: "tibus",
    shots: [
      { file: "tibus-1.png", url: "https://tibus.app/fr" },
      { file: "tibus-2.png", url: "https://tibus.app/fr/traveler/search" },
      { file: "tibus-3.png", url: "https://tibus.app/fr/traveler/map" },
    ],
  },
  {
    folder: "gestabiscom",
    shots: [
      { file: "gestabiscom-1.png", url: "https://gestabiscom.vercel.app/home" },
      { file: "gestabiscom-2.png", url: "https://gestabiscom.vercel.app/home" },
      { file: "gestabiscom-3.png", url: "https://gestabiscom.vercel.app/home" },
    ],
  },
  {
    folder: "tabispay",
    shots: [
      { file: "tabispay-1.png", url: "https://tabispay.cervel.app" },
      { file: "tabispay-2.png", url: "https://tabispay.cervel.app" },
      { file: "tabispay-3.png", url: "https://tabispay.cervel.app" },
    ],
  },
  {
    folder: "tabisride",
    shots: [
      { file: "tabisride-1.png", url: "https://tabisride.lovable.app" },
      { file: "tabisride-2.png", url: "https://tabisride.lovable.app" },
      { file: "tabisride-3.png", url: "https://tabisride.lovable.app" },
    ],
  },
];

async function capture(page, url, filePath) {
  try {
    await page.goto(url, { waitUntil: "networkidle2", timeout: 45000 });
    await new Promise((r) => setTimeout(r, 2500));
    await page.screenshot({ path: filePath, type: "png" });
    console.log("OK", filePath);
    return true;
  } catch (err) {
    console.log("FAIL", filePath, err.message);
    return false;
  }
}

async function main() {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 2 });

  for (const group of captures) {
    const dir = path.join(OUT, group.folder);
    fs.mkdirSync(dir, { recursive: true });

    for (let i = 0; i < group.shots.length; i++) {
      const shot = group.shots[i];
      const filePath = path.join(dir, shot.file);

      if (group.folder === "gestabiscom" && i > 0) {
        const tabs = ["Entreprises", "Opérations", "Produits"];
        try {
          await page.goto(group.shots[0].url, { waitUntil: "networkidle2", timeout: 45000 });
          await new Promise((r) => setTimeout(r, 2000));
          const clicked = await page.evaluate((label) => {
            const links = [...document.querySelectorAll("a, button, span, div")];
            const el = links.find((n) => n.textContent?.trim() === label);
            if (el) {
              el.click();
              return true;
            }
            return false;
          }, tabs[i - 1]);
          if (clicked) await new Promise((r) => setTimeout(r, 2000));
        } catch {
          /* continue */
        }
        await page.screenshot({ path: filePath, type: "png" });
        console.log("OK", filePath);
        continue;
      }

      await capture(page, shot.url, filePath);
    }
  }

  await browser.close();
}

main();
