/// <reference types="cypress" />

import '../../support/commands';

describe('Deve testar a um nível de backend', () => {
    /* let token */

    before(() => {
        cy.getToken('a@a', 'a')
            /* .then(tkn => {
                token = tkn
            })
            ! Token está sendo validado a partir de um overwrite no método nativo do request 
            */
    })

    beforeEach(() => {
       cy.resetRest()
    })

    it('Deve criar uma conta', () => {
         cy.request({
            url: '/contas',
            method: 'POST',
            /* headers: { Authorization: `JWT ${token}`}, */
            body: {
                nome: 'Conta via rest'
            }
        }).as('response')

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'Conta via rest')
        })
    })

    it('Deve atualizar uma conta', () => {
        cy.getAccountByName('Conta para alterar')
            .then(contaID => {
            cy.request({
                url: `/contas/${contaID}`,
                method: 'PUT',
                /* headers: { Authorization: `JWT ${token}`}, */
                body: {
                    nome:'Conta alterada via rest'
                }
            }).as('response')
        })
        cy.get('@response').its('status').should('be.equal', 200)
    })

    it('Não deve criar uma conta com o mesmo nome', () => {
        cy.request({
            url: '/contas',
            method: 'POST',
            /* headers: { Authorization: `JWT ${token}`}, */
            body: {
                nome: 'Conta mesmo nome'
            },
            failOnStatusCode: false
        }).as('response')

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(400)
            expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!')
        })
    })

    it('Deve criar uma transacao', () => {
        cy.getAccountByName('Conta para movimentacoes')
            .then(contaID => {
                cy.request({
                    url: '/transacoes',
                    method: 'POST',
                    /* headers: { Authorization: `JWT ${token}`}, */
                    body: {
                        conta_id: contaID,
                        data_pagamento: '14/07/2023',
                        data_transacao: '14/07/2023',
                        /* 
                        data_pagamento: Cypress.moment().add({days: 1}).format('DD/MM/YYYY'),
                        data_transacao: Cypress.moment().format('DD/MM/YYYY'),
                         */
                        descricao: "desc",
                        envolvido: "inter",
                        status: true,
                        tipo: "REC",
                        valor: "123"
                    },
                }).as('response')
            })
        cy.get('@response').its('status').should('be.equal', 201)
        cy.get('@response').its('body.id').should('exist')
    })

    it('Deve validar o saldo', () => {
        cy.request({
            url: '/saldo',
            method: 'GET',
            /* headers: { Authorization: `JWT ${token}`} */
        }).then(res => {
            let saldoConta = null
            res.body.forEach(c => {
                console.log(saldoConta)
                if(c.conta === 'Conta para saldo') saldoConta = c.saldo
                console.log(saldoConta)
            })
            expect(saldoConta).to.be.equal('534.00')
        })

        cy.request({
            method: 'GET',
            url: '/transacoes',
            /* headers: { Authorization: `JWT ${token}`}, */
            qs: { descricao: 'Movimentacao 1, calculo saldo'}
        }).then(res => {
            cy.request({
                url: `/transacoes/${res.body[0].id}`,
                method: 'PUT',
                /* headers: { Authorization: `JWT ${token}`}, */
                body: {
                    status: true,
                    data_transacao: '14/07/2023',
                    data_pagamento: '14/07/2023',
                    descricao: res.body[0].descricao,
                    envolvido: res.body[0].envolvido,
                    valor: res.body[0].valor,
                    conta_id: res.body[0].conta_id
                }
            }).its('status').should('be.equal', 200)
        })

        cy.request({
            url: '/saldo',
            method: 'GET',
            /* headers: { Authorization: `JWT ${token}`} */
        }).then(res => {
            let saldoConta = null
            res.body.forEach(c => {
                console.log(saldoConta)
                if(c.conta === 'Conta para saldo') saldoConta = c.saldo
                console.log(saldoConta)
            })
            expect(saldoConta).to.be.equal('4034.00')
        })

    })

    it('Deve remover uma transacao', () => {
        cy.request({
            method: 'GET',
            url: '/transacoes',
            /* headers: { Authorization: `JWT ${token}`}, */
            qs: { descricao: 'Movimentacao para exclusao'}
        }).then(res => {
            cy.request({
                url: `/transacoes/${res.body[0].id}`,
                method: 'DELETE',
               /*  headers: { Authorization: `JWT ${token}`}, */
            }).its('status').should('be.equal', 204)
        })
    })
});