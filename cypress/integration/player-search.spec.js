describe("Integration :: Player Search", () => {
  const url = Cypress.env("API_URL");

  beforeEach(() => {
    cy.visit("http://localhost:3000");

    cy.get('button[data-testid="platform-psn"]').as("psnBtn");
    cy.get('button[data-testid="platform-xbl"]').as("xblBtn");
    cy.get('button[data-testid="platform-origin"]').as("pcBtn");

    cy.get('input[name="player-tag"]').as("playerHandleInput");

    cy.get('button[data-testid="submit-btn"]').as("submitBtn");

    cy.server({ delay: 50 });
  });

  it("Should not submit a player search with empty fields", () => {
    cy.get("@submitBtn").click();

    cy.get(".error-msg").contains("Please complete the form");
  });

  it("Should not submit a player search with only a platform selected", () => {
    cy.get("@psnBtn").click();

    cy.get("@submitBtn").click();

    cy.get(".error-msg").contains("Please complete the form");
  });

  it("Should not submit a player search with only a player handle entered", () => {
    cy.get("@playerHandleInput").type("leroyjenkins");

    cy.get("@submitBtn").click();

    cy.get(".error-msg").contains("Please complete the form");
  });

  it("Should submit a player search for Leroy Jenkins, and display no players found msg", () => {
    cy.route({
      url,
      method: "POST",
      response: { data: { searchPlayers: [] } }
    }).as("searchLeroyJenkins");

    cy.get("@playerHandleInput").type("leroyjenkins");

    cy.get("@psnBtn").click();

    cy.get("@submitBtn").click();

    cy.get("@submitBtn").contains("Loading...");

    cy.wait("@searchLeroyJenkins");

    cy.get(".error-msg").contains("No players were found with those details");
  });

  it("Should submit a player search for DiRTiG, and display results", () => {
    cy.fixture("player-search-DiRTiG").then(response => {
      cy.route({
        method: "POST",
        response,
        url
      }).as("searchDiRTiG");
    });

    cy.get("@playerHandleInput").type("DiRTiG");

    cy.get("@psnBtn").click();

    cy.get("@submitBtn").click();

    cy.get("@submitBtn").contains("Loading...");

    cy.wait("@searchDiRTiG");

    cy.get('ul[data-testid="search-results"]');

    cy.get('li[data-testid="psn-dirtig"]')
      .find('span[data-testid="user-handle"]')
      .contains("dirtig");

    cy.get('li[data-testid="psn-dirtig"]')
      .find('span[data-testid="user-platform"]')
      .contains("psn");
  });

  it("Should allow user to click search result and redirect to /stats route", () => {
    cy.fixture("player-search-DiRTiG").then(response => {
      cy.route({
        method: "POST",
        response,
        url
      }).as("searchDiRTiG");
    });

    cy.get("@playerHandleInput").type("DiRTiG");

    cy.get("@psnBtn").click();

    cy.get("@submitBtn").click();

    cy.get("@submitBtn").contains("Loading...");

    cy.wait("@searchDiRTiG");

    cy.get('ul[data-testid="search-results"]');

    // THE STACKING OF NETWORK STUBS IS UNPLEASANT, NICER SOLUTION REQUIRED
    cy.fixture("player-stats-DiRTiG").then(response => {
      cy.route({
        method: "POST",
        response,
        url
      }).as("DiRTiGStatsPage");
    });

    cy.get('li[data-testid="psn-dirtig"]').click();

    cy.wait("@DiRTiGStatsPage");
  });
});
