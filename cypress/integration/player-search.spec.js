describe('Integration :: Player Search', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')

    cy.get('button[data-testid="platform-psn"]').as('psnBtn')
    cy.get('button[data-testid="platform-xbl"]').as('xblBtn')
    cy.get('button[data-testid="platform-origin"]').as('pcBtn')

    cy.get('input[name="player-tag"]').as('playerHandleInput')

    cy.get('button[data-testid="submit-btn"]').as('submitBtn')

    cy.server({ delay: 500 })
    cy.route({
      url: 'http://localhost:3000/apex-api/v2/apex/standard/search?platform=psn&query=leroyjenkins',
      response: { data: [] }
    }).as('searchLeroyJenkins')

    cy.fixture('player-search-DIRTiG').then(response => {
      cy.route({
        url: 'http://localhost:3000/apex-api/v2/apex/standard/search?platform=psn&query=DiRTiG',
        response
      }).as('searchDiRTiG')
    })

    cy.fixture('player-stats-DIRTiG').then(response => {
      cy.route({
        url: 'http://localhost:3000/apex-api/v1/apex/standard/profile/psn/DiRTiG',
        response
      }).as('DiRTiGStatsPage')
    })
  })

  it('Should not submit a player search with empty fields', () => {
    cy.get('@submitBtn').click()

    cy.get('.error-msg').contains('Please complete the form')
  })

  it('Should not submit a player search with only a platform selected', () => {
    cy.get('@psnBtn').click()

    cy.get('@submitBtn').click()

    cy.get('.error-msg').contains('Please complete the form')
  })

  it('Should not submit a player search with only a player handle entered', () => {
    cy.get('@playerHandleInput').type('leroyjenkins')

    cy.get('@submitBtn').click()

    cy.get('.error-msg').contains('Please complete the form')
  })

  it('Should submit a player search for Leroy Jenkins, and display no players found msg', () => {
    cy.get('@playerHandleInput').type('leroyjenkins')

    cy.get('@psnBtn').click()

    cy.get('@submitBtn').click()

    cy.get('@submitBtn').contains('Loading...')

    cy.wait('@searchLeroyJenkins')

    cy.get('.error-msg').contains('No players were found with those details')
  })

  it('Should submit a player search for DiRTiG, and display results', () => {
    cy.get('@playerHandleInput').type('DiRTiG')

    cy.get('@psnBtn').click()

    cy.get('@submitBtn').click()

    cy.get('@submitBtn').contains('Loading...')

    cy.wait('@searchDiRTiG')

    cy.get('ul[data-testid="search-results"]')

    cy.get('li[data-testid="psn-DiRTiG"]')
      .find('span[data-testid="user-handle"]').contains('DiRTiG')

    cy.get('li[data-testid="psn-DiRTiG"]')
      .find('span[data-testid="user-platform"]').contains('psn')
  })

  it('Should allow use to click search result and redirect to /stats route', () => {
    cy.get('@playerHandleInput').type('DiRTiG')

    cy.get('@psnBtn').click()

    cy.get('@submitBtn').click()

    cy.get('@submitBtn').contains('Loading...')

    cy.wait('@searchDiRTiG')

    cy.get('ul[data-testid="search-results"]')

    cy.get('li[data-testid="psn-DiRTiG"]').click()

    cy.wait('@DiRTiGStatsPage')
  })
})
