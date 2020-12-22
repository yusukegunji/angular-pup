import * as functions from 'firebase-functions';
import * as puppeteer from 'puppeteer';
import * as admin from 'firebase-admin';

export const db = admin.firestore;

export const getRaseData = functions
  .region('asia-northeast1')
  .runWith({
    timeoutSeconds: 300,
    memory: '1GB',
  })
  .https.onCall(async (data, context) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://db.netkeiba.com/race/');

    const resultsSelector = '.race_table_01 nk_tb_common';

    await page.waitForSelector('.race_table_01 nk_tb_common');

    const links = await page.evaluate((selector: string) => {
      const races = Array.from(document.querySelectorAll(selector));
      return races.map((rase: Element) => {
        const title = rase.querySelector('h1')?.textContent;
        const url = rase.getAttribute('href');
        return {
          title,
          url,
        };
      });
    }, resultsSelector);

    await browser.close();

    return links;
  });
