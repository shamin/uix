#!/usr/bin/env node

const puppeteer = require('puppeteer');

(async function run() {
  let failures = 0;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on("console", m => {
    if (m.type() === "error") {
      console.error(`${m.text()} in ${m.location().url}:${m.location().lineNumber}`);
    } else {
      console.log(...m.args().map(a => a._remoteObject.value));
    }
  });

  return new Promise(async (resolve, reject) => {
    await page.exposeFunction("testsFailed", n => {
        failures = n;
      }
    );

    await page.exposeFunction("testsDone", async () => {
        await page.close();
        await browser.close();

        if (failures > 0) {
          reject();
        } else {
          resolve();
        }
      }
    );

    await page.goto(`file://${process.argv[2]}/index.html`);
  });
})();
