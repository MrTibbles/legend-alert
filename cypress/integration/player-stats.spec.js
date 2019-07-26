describe('Integration :: Player Stats', () => {
  beforeEach(() => {
    cy.setDefaultPlayer()
  })

  it('Should display stats for a player', () => {
    cy.get('h3[data-testid="player-info"]').contains('dirtig | psn')
  })
})
