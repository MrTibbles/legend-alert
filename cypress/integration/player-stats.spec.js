describe('Integration :: Player Stats', () => {
  beforeEach(() => {
    cy.setDefaultPlayer()

    cy.get('button[data-testid="show-legend-selector"]').as('legendSelector')

    cy.get('a[data-testid="player-search-link_mobile"]').as('playerSearchLink_mobile')

    cy.get('div[data-testid="stats-grid"] > div[data-testid="stats-item"]').as('statsItems')
  })

  describe('Mobile view', () => {
    beforeEach(() => {
      cy.viewport(800, 900)
    })

    it('Should display stats for default player', () => {
      cy.get('h3[data-testid="player-info"]').contains('dirtig | psn')

      cy.get('img[data-testid="legend-image"]')
        .invoke('attr', 'src')
        .should('include', 'wattson-tall.png')

      cy.get('@legendSelector')
      cy.get('@playerSearchLink_mobile')

      cy.get('@statsItems').should('have.length', 3)
    })

  })
})
