// Set a player session for viewing their stats, due to restrictions on
Cypress.Commands.add("setDefaultPlayer", () => {
  // Setup the network spies
  cy.server({ delay: 50 })

  cy.fixture('player-search-DiRTiG').then(response => {
    cy.route({
      method: 'POST',
      response,
      url: 'http://localhost:4000',
    }).as('searchDiRTiG')
  })

  cy.visit('http://localhost:3000')

  cy.get('input[name="player-tag"]').type('DiRTiG')

  cy.get('button[data-testid="platform-psn"]').click()

  cy.get('button[data-testid="submit-btn"]').click()

  cy.wait('@searchDiRTiG')

  cy.fixture('player-stats-DiRTiG').then(response => {
    cy.route({
      method: 'POST',
      response,
      url: 'http://localhost:4000',
    }).as('DiRTiGStatsPage')
  })

  cy.get('ul[data-testid="search-results"]')

  cy.get('li[data-testid="psn-dirtig"]').click()

  cy.wait('@DiRTiGStatsPage')
})
