const webDriver = require("selenium-webdriver");

const rootURL = "http://localhost:3000/courses";
let driver;
let courses;

const waitForNewPage = () => {
  return driver
    .executeScript("return document.readyState")
    .then(function(readyState) {
      return readyState === "complete";
    });
};

beforeAll(done => {
  driver = new webDriver.Builder().forBrowser("chrome").build();

  driver.get(rootURL).then(done);
});

afterAll(async done => {
  await driver.findElement(webDriver.By.linkText("New updated title")).click();

  const titleInput = await driver.findElement(webDriver.By.name("title"));

  titleInput.clear();
  titleInput.sendKeys("Securing React Apps with Auth0");

  await driver.findElement(webDriver.By.className("btn-primary")).click();
  driver.quit().then(done);
});

describe("Courses page", () => {
  describe("Table", () => {
    it("should contain one table with 5 columns", async () => {
      const table = await driver.findElements(webDriver.By.xpath("//table"));
      const columns = await driver.findElements(webDriver.By.xpath("//th"));

      const tableColumnNames = ["", "Title", "Author", "Category", ""];
      let colEval;

      for (let i = 0; i < columns.length; i++) {
        let column = await columns[i].getText();

        colEval = tableColumnNames[i] === column ? true : false;
      }

      expect(table.length).toEqual(1);
      expect(columns.length).toEqual(5);
      expect(colEval).toBe(true);
    });

    it("should contain 10 items in the courseList by default", async () => {
      const rows = await driver.findElements(webDriver.By.css("tbody > tr"));
      expect(rows.length).toEqual(10);
    });

    it("should take you to an external course link if you click the watch button", async () => {
      jest.setTimeout(10000);

      const link = await driver.findElement(webDriver.By.linkText("Watch"));
      await link.click();

      const courseTitlePluralSight = await driver
        .findElement(webDriver.By.css("h1"))
        .getText();

      expect(courseTitlePluralSight).toEqual("Securing React Apps with Auth0");
    });
  });

  describe("Add Course", () => {
    it("Should add course successfully", async () => {
      driver.get(rootURL);
      const button = await driver.findElement(
        webDriver.By.className("add-course")
      );
      await button.click();

      await driver
        .findElement(webDriver.By.name("title"))
        .sendKeys("Test title");

      const selectAuthor = await driver.findElement(
        webDriver.By.name("authorId")
      );
      await selectAuthor.click();
      await selectAuthor
        .findElement(webDriver.By.css("option[value='1']"))
        .click();

      await driver
        .findElement(webDriver.By.name("category"))
        .sendKeys("Test category");

      await driver.findElement(webDriver.By.className("btn-primary")).click();

      driver.wait(waitForNewPage());

      const rows = await driver.findElements(webDriver.By.css("tbody > tr"));
      expect(rows.length).toEqual(11);
    });
  });

  describe("Delete Course", () => {
    it("Should add course successfully", async () => {
      await driver
        .findElement(webDriver.By.xpath("//tbody/tr[last()]/td[last()]/button"))
        .click();

      const rows = await driver.findElements(webDriver.By.css("tbody > tr"));
      expect(rows.length).toEqual(10);
    });
  });

  describe("Update Course", () => {
    it("Should update course successfully", async () => {
      await driver
        .findElement(webDriver.By.linkText("Securing React Apps with Auth0"))
        .click();

      const titleInput = await driver.findElement(webDriver.By.name("title"));

      titleInput.clear();
      titleInput.sendKeys("New updated title");

      await driver.findElement(webDriver.By.className("btn-primary")).click();

      driver.wait(waitForNewPage());

      const updatedTitle = await driver
        .findElement(
          webDriver.By.css("tbody > tr:nth-of-type(1)>td:nth-of-type(2)>a")
        )
        .getText();

      expect(updatedTitle).toEqual("New updated title");
    });
  });
});
