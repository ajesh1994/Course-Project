describe("Navigation Bar", () => {
  it("should contain the correct number of nav links", () => {
    cy.visit("/");
    cy.get("nav").contains("Home");
    cy.get("nav").contains("About");
    cy.get("nav").contains("Courses");
  });

  it("should contain a block of text with a button", async () => {
    cy.get(".jumbotron").contains("Pluralsight Administration");
    cy.get(".btn").should("have.length", 1);
  });
});
