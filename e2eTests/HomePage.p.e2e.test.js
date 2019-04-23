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
    await page.goto("http://localhost:3000/");
  });

  afterAll(done => {
    browser.close();
  });

  it("should find all nav links", async () => {
    const innerText = await page.evaluate(
      () => document.querySelector("nav").innerText
    );
    expect(innerText).toContain("Home");
    expect(innerText).toContain("About");
    expect(innerText).toContain("Courses");
  });

  it("should contain a block of text with a button", async () => {
    const innerText = await page.evaluate(
      () => document.querySelector(".jumbotron").innerText
    );
    const button = (await page.$$(".btn")).length;
    expect(innerText).toContain("Pluralsight Administration");
    expect(button).toEqual(1);
  });
});
