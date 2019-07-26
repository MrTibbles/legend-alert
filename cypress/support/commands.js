// Set a player session for viewing their stats, due to restrictions on
Cypress.Commands.add("setDefaultPlayer", () => {
  // Setup the network spies
  cy.server({ delay: 100 })

  cy.fixture('player-search-DiRTiG').then(response => {
    cy.route({
      url: 'http://localhost:3000/apex-api/v2/apex/standard/search?platform=psn&query=DiRTiG',
      response
    }).as('searchDiRTiG')
  })

  cy.fixture('player-stats-DiRTiG').then(response => {
    cy.route({
      url: 'http://localhost:3000/apex-api/v1/apex/standard/profile/psn/dirtig',
      response
    }).as('DiRTiGStatsPage')
  })

  cy.visit('http://localhost:3000')

  cy.get('input[name="player-tag"]').type('DiRTiG')

  cy.get('button[data-testid="platform-psn"]').click()

  cy.get('button[data-testid="submit-btn"]').click()

  cy.wait('@searchDiRTiG')

  cy.get('ul[data-testid="search-results"]')

  cy.get('li[data-testid="psn-DiRTiG"]').click()

  cy.wait('@DiRTiGStatsPage')
})
