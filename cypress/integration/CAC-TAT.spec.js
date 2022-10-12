/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(function () {
        cy.visit('./src/index.html')
    });

    it('Verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    });

    // O it.only diz que iremos executar apenas esse teste
    it('preenche os campos obrigatórios e envia o formulário', function () {
        cy.get('#firstName').type('Cris')
        cy.get('#lastName').type('Nazário')
        cy.get('#email').type('email@email.com')
        cy.get('#open-text-area').type('Minions ipsum gelatooo uuuhhh para tú bappleees para tú tank yuuu! Gelatooo po kass. Bappleees poopayee tulaliloo pepete belloo! Wiiiii. Baboiii hana dul sae bappleees pepete hana dul sae po kass po kass baboiii. Belloo! hahaha baboiii poopayee hahaha belloo! La bodaaa bee do bee do bee do chasy. Pepete poopayee tank yuuu! Butt la bodaaa wiiiii aaaaaah ti aamoo! Poulet tikka masala. Tatata bala tu daa ti aamoo! Poulet tikka masala poopayee wiiiii bappleees hana dul sae ti aamoo! Jeje belloo!', { 'delay': 0 })
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible').contains('Mensagem enviada com sucesso.')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.get('#email').type('email@')

        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })


    it('campo telefone continua vazio quando preenchido com valor não-numérico', function () {
        cy.get('#phone')
            .type('abcdefghij')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.get('#firstName').type('Cris')
        cy.get('#lastName').type('Nazário')
        cy.get('#email').type('email@email.com')
        cy.get('#phone-checkbox')
            .check()
            .should('be.checked')
        cy.get('#open-text-area').type('Minions')

        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('#firstName')
            .type('Cris')
            .should('have.value', 'Cris')
            .clear()
            .should('have.value', '')

        cy.get('#lastName')
            .type('Nazário')
            .should('have.value', 'Nazário')
            .clear()
            .should('have.value', '')

        cy.get('#email')
            .type('email@email.com.br')
            .should('have.value', 'email@email.com.br')
            .clear()
            .should('have.value', '')

        cy.get('#phone')
            .type('2134345656')
            .should('have.value', '2134345656')
            .clear()
            .should('have.value', '')

    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function () {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function () {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function () {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice (posição)', function () {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    //Uma forma de fazer
    it('marca o tipo de atendimento feedback', function () {
        cy.get('input[type="radio"]')
            .check('feedback')
            .should('have.value', 'feedback')
    })


    it('resposta - marca o tipo de atendimento feedback', function () {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    //Uma forma de fazer
    it('marca cada tipo de atendimento', function () {
        cy.get('input[type="radio"]')
            .check()
            .should('be.checked')
    })

    it('resposta - marca cada tipo de atendimento', function () {
        cy.get('input[type="radio"]')
            .should('have.length', 3)

            //O eacch vai percorrer os elementos passado por parâmetro
            .each(function ($radio) {

                //o wrap empacota os elementos -- pesquisar melhor o que ele significa
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    it('marca ambos checkboxes, depois desmarca o último', function () {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    //Pelo vídeo do YT
    it('seleciona um arquivo por upload', function () {
        cy.get('input[type="file"]')
            .selectFile('cypress/fixtures/testeVR5.pdf')
            .then(input => {
                expect(input[0].files[0].name).to.equal('testeVR5.pdf')
            })
    })

    it('seleciona um arquivo por upload', function () {
        cy.get('input[type="file"]')
            .selectFile(['cypress/fixtures/testeVR5.pdf', 'cypress/fixtures/vr-va.pdf'])
            .then(input => {
                expect(input[0].files[0].name).to.equal('testeVR5.pdf')
            })
    })

    it('seleciona uum arquivo por upload simulando um drag-and-drop', function () {
        cy.get('input[type="file"]')                  //O action aceita select e action
            .selectFile('cypress/fixtures/vr-va.pdf', { action: 'drag-drop' })
            .then(input => {
                expect(input[0].files[0].name).to.equal('vr-va.pdf')
            })
    })

    it('seleciona múltuplos arquivos para upload', function () {
        cy.get('input[type="file"]')
            .selectFile([
                'cypress/fixtures/testeVR5.pdf',
                'cypress/fixtures/vr-va.pdf'
            ])
            .then(input => {
                expect(input[0].files[0].name).to.equal('testeVR5.pdf')
                expect(input[0].files[1].name).to.equal('vr-va.pdf')
            })
    })

    // fim 

    it('seleciona um arquivo da pasta fixtures', function () {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/vr-va.pdf')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('vr-va.pdf')
            })
    })

    it('seleciona um arquivo da pasta fixtures com drag-and-drop', function () {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/vr-va.pdf', { action: "drag-drop" })
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('vr-va.pdf')
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
        cy.fixture('vr-va.pdf').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('vr-va.pdf')
            })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade do click', function () {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando', function () {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
        
            cy.contains('Talking About Testing').should('be.visible')
    })

    it('', function () {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
        
        cy.get('#white-background p').should('not.be.null')
    })
});