describe('Testando input e validações de input', () => {
  it('Input aceita apenas números', () => {
    cy.visit('https://what-s-the-number.vercel.app')
    cy.get('.input')
    .type('junin@gmail.com')
    .should('have.value', '')
    cy.get('.input')
    .type('!@@#$%%#@$¨&')
    .should('have.value', '')
  })

  it('Informa ao usuário que o número deve estar entre 0 e 300 em todos os casos de erro', () => {
    cy.get('.input')
    .type('junin')
    cy.get('.erro-info').should('contain', 'O número deve estar entre 0 e 300')

    cy.get('.input')
    .type('301')
    cy.get('.erro-info').should('contain', 'O número deve estar entre 0 e 300')

    cy.get('.input')
    .clear()

    cy.get('.input')
    .type('lesr134')
    cy.get('.erro-info').should('contain', 'O número deve estar entre 0 e 300')

    cy.get('.input')
    .type('!@#$%')
    cy.get('.erro-info').should('contain', 'O número deve estar entre 0 e 300')

    cy.get('.input')
    .type('-!2dmk12!@#%%#rjun')
    cy.get('.erro-info').should('contain', 'O número deve estar entre 0 e 300')

    cy.get('.input').clear()
  })

  it('Todos os casos em que o input é aceito', () => {
    cy.get('.input')
    .type('1').should('have.value', '1')
    cy.get('.input')
    .type('1').should('have.value', '11')
    cy.get('.input')
    .type('1').should('have.value', '111')

    cy.get('.submit').click()
  }) 
})