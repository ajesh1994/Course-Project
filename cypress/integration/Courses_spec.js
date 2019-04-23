describe("Courses Page", () => {
  describe("Table", () => {
    it("should contain one table with 5 columns", () => {
      cy.visit("/courses");
      cy.get("table").should("have.length", 1);

      const tableColumnNames = ["", "Title", "Author", "Category", ""];
      cy.get("th").each((element, index, list) => {
        console.log(index);
        cy.wrap(element).should("have.text", tableColumnNames[index]);
      });
    });

    it("should contain 10 items in the courseList by default", () => {
      cy.get("tbody > tr").should("have.length", 10);
    });

    it("should take you to an external course link if you click the watch button", () => {
      cy.get("td > a")
        .eq(0)
        .should(
          "have.attr",
          "href",
          "http://pluralsight.com/courses/react-auth0-authentication-security"
        );
    });
  });

  describe("Add Course", () => {
    it("Should add course successfully", () => {
      cy.get(".add-course").click();
      cy.get(".form-group:nth-child(2) > .field > input")
        .click()
        .type("Test Title");

      cy.get(".form-group:nth-child(3) > .field > select").select("Cory House");

      cy.get(".form-group:nth-child(4) > .field > input")
        .click()
        .type("Test Category");

      cy.get(".container-fluid > form > button").click();
      cy.get("tbody > tr").should("have.length", 11);
    });
  });

  describe("Delete Course", () => {
    it("Should add course successfully", () => {
      cy.get(".table > tbody > tr:nth-last-child(1) > td > button").click();
      cy.get("tbody > tr").should("have.length", 10);
    });
  });
});
