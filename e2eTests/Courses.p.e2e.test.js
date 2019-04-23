const puppeteer = require("puppeteer");
let page;
let browser;

describe("/ (Home Page)", () => {
  let page;
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false
    });
    page = await browser.newPage();
    await page.goto("http://localhost:3000/courses");
  });

  afterAll(done => {
    browser.close();
  });

  describe("Table", () => {
    it("should contain one table with 5 columns", async () => {
      await page.waitForSelector("table");

      let table = (await page.$$("table")).length;
      const columns = (await page.$$("th")).length;

      const tableColumnNames = ["", "Title", "Author", "Category", ""];

      const data = await page.evaluate(() => {
        const col = Array.from(document.querySelectorAll("th"));
        return col.map(heading => heading.textContent);
      });

      const colEval = tableColumnNames.every(e => data.includes(e));

      expect(table).toEqual(1);
      expect(columns).toEqual(5);
      expect(colEval).toBe(true);
    });

    it("should contain 10 items in the courseList by default", async () => {
      let table = (await page.$$("tbody > tr")).length;
      expect(table).toEqual(10);
    });

    it("should take you to an external course link if you click the watch button", async () => {
      (await page.$("td > a")).click();

      await page.waitForSelector("h1");
      const courseTitlePluralSight = await page.evaluate(
        () => document.querySelector("h1").innerText
      );

      expect(courseTitlePluralSight).toEqual("Securing React Apps with Auth0");
    });
  });

  describe("Add Course", () => {
    it("Should add course successfully", async () => {
      await page.goto("http://localhost:3000/courses");
      await page.waitForSelector("#app > .container-fluid > div > div > .btn");

      await page.click("#app > .container-fluid > div > div > .btn");

      await page.waitForSelector(".form-group:nth-child(2) > .field > input");
      await page.click(".form-group:nth-child(2) > .field > input");

      await page.type(
        ".form-group:nth-child(2) > .field > input",
        "Test Title"
      );

      await page.waitForSelector(".form-group:nth-child(3) > .field > select");
      await page.click(".form-group:nth-child(3) > .field > select");

      await page.select(".form-group:nth-child(3) > .field > select", "1");

      await page.waitForSelector(".form-group:nth-child(4) > .field > input");
      await page.click(".form-group:nth-child(4) > .field > input");

      await page.type(
        ".form-group:nth-child(4) > .field > input",
        "Test Category"
      );

      await page.waitForSelector(".container-fluid > form > button");
      await page.click(".container-fluid > form > button");

      await page.waitForSelector("table");
      let rows = (await page.$$("tbody > tr")).length;

      expect(rows).toEqual(11);
    });
  });

  describe("Delete Course", () => {
    it("Should add course successfully", async () => {
      await page.waitForSelector(
        ".table > tbody > tr:nth-last-child(1) > td > button"
      );
      await page.click(".table > tbody > tr:nth-last-child(1) > td > button");

      await page.waitForSelector("table");
      let rows = (await page.$$("tbody > tr")).length;

      expect(rows).toEqual(10);
    });
  });

  describe("Update Course", () => {
    it("Should update course successfully", async () => {
      await page.waitForSelector(
        ".table > tbody > tr:nth-child(1) > td:nth-child(2) > a"
      );
      await page.click(
        ".table > tbody > tr:nth-child(1) > td:nth-child(2) > a"
      );

      await page.waitForSelector(
        ".container-fluid > form > .form-group:nth-child(2) > .field > .form-control"
      );
      await page.click(
        ".container-fluid > form > .form-group:nth-child(2) > .field > .form-control",
        { clickCount: 3 }
      );
      await page.keyboard.press("Backspace");

      await page.type(
        ".form-group:nth-child(2) > .field > input",
        "New updated title"
      );

      await page.waitForSelector(
        "body > #app > .container-fluid > form > .btn"
      );
      await page.click("body > #app > .container-fluid > form > .btn");

      await page.waitForSelector(
        "tbody > tr:nth-of-type(1)>td:nth-of-type(2)>a"
      );

      const updatedTitle = await page.evaluate(
        () =>
          document.querySelector(
            "tbody > tr:nth-of-type(1)>td:nth-of-type(2)>a"
          ).innerText
      );
      expect(updatedTitle).toEqual("New updated title");
    });
  });
});
