describe('Integration :: Player Search', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')

    cy.get('button[data-testid="platform-psn"]').as('psnBtn')
    cy.get('button[data-testid="platform-xbl"]').as('xblBtn')
    cy.get('button[data-testid="platform-origin"]').as('pcBtn')

    cy.get('input[name="player-tag"]').as('playerHandleInput')

    cy.get('button[data-testid="submit-btn"]').as('submitBtn')

    cy.server({ delay: 750 })
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/apex-api/v2/apex/standard/search?platform=psn&query=leroyjenkins',
      response: { data: [] }
    }).as('searchLeroyJenkins')
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
  })
})
