//Onde ficam os comandos customizados

//Adicinar um novo comando ao Cypress
//É passado por parâmetro o nome do comando customizadoque você quer criar
//O segundo argumento é uma função de callback que será responsável por executar os passos do comando que dizemos que iremos realizar
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    cy.get('#firstName').type('Cris')
    cy.get('#lastName').type('Nazário')
    cy.get('#email').type('email@email.com')
    cy.get('#open-text-area').type('Minions')
    cy.contains('button', 'Enviar').click()
})