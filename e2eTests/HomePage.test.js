const webDriver = require("selenium-webdriver");

const rootURL = "http://localhost:3000/";
let driver;

beforeAll(done => {
  driver = new webDriver.Builder().forBrowser("chrome").build();

  driver.get(rootURL).then(done);
});

afterAll(done => {
  driver.quit().then(done);
});

describe("Navigation Bar", () => {
  it("should find all nav links", async () => {
    const el = await driver.findElement(webDriver.By.xpath("//nav"));
    const actual = await el.getText();

    expect(actual).toContain("Home");
    expect(actual).toContain("About");
    expect(actual).toContain("Courses");
  });

  it("should contain a block of text with a button", async () => {
    const el = await driver.findElement(webDriver.By.className("jumbotron"));
    const elementText = await el.getText();
    const button = await driver.findElements(webDriver.By.className("btn"));

    expect(elementText).toContain("Pluralsight Administration");
    expect(button.length).toEqual(1);
  });
});
