describe('Integration :: Player Stats', () => {
  beforeEach(() => {
    cy.setDefaultPlayer()

    cy.viewport(800, 900)

    cy.get('button[data-testid="show-legend-selector"]').as('legendSelector')

    cy.get('a[data-testid="player-search-link_smlScreen"]').as('playerSearchLink_smlScreen')

    cy.get('img[data-testid="legend-image"]').as('legendImage')

    cy.get('div[data-testid="stats-item"]').as('statsItems')

    cy.get('li[data-testid="legend-option"]').as('legendOptions')
  })

  it('Should display stats for default player', () => {
    cy.get('h3[data-testid="player-info"]').contains('dirtig | psn')

    cy.get('@legendImage')
      .invoke('attr', 'src')
      .should('include', 'caustic-tall.png')

    cy.get('@legendSelector')
    cy.get('@playerSearchLink_smlScreen')

    cy.get('@statsItems').should('have.length', 5)
  })

  it('Should allow the user to view a different legend', () => {

    cy.get('@legendImage')
      .invoke('attr', 'src')
      .should('include', 'caustic-tall.png')

    cy.get('@legendSelector').click()

    cy.get('@legendOptions').each($option => {
      if ($option.text() === 'Wattson') return cy.wrap($option).click()
    })

    cy.get('@legendImage')
      .invoke('attr', 'src')
      .should('include', 'wattson-tall.png')

    cy.get('@statsItems').should('have.length', 3)
  })

})
