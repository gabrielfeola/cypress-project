/*
! Ainda preciso validar uma forma diferente do xpath para localizar os elementos, para não depender
! de locators que usam a posição dos elementos como base.
! Na bateria de teste abaixo, sempre que é preciso interagir/validar com algum elemento que está em uma lista
! foi preciso utilizar o locator genérico de posição. Por conta disso, pode ser que eventualmente algum teste
! apresente falhas na primeira execução, dependendo da posição onde os elementos foram renderizados.

! É preciso refatorar o código assim que aprender alguma forma diferente de usar o locator que não seja o xpath.
*/

/// <reference types="cypress" />

import '../../support/commandsContas';
import loc from '../../support/locators';

describe('Deve testar a um nível funcional', () => {
    beforeEach(() => {
        cy.login('a@a', 'a')
    })

    it('Deve criar uma conta', () => {
        cy.resetApp()
        cy.acessarMenuConta()
        cy.inserirConta('Conta teste')
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso')
    })

    it('Deve atualizar uma conta', () => {
        cy.acessarMenuConta()
        cy.get(loc.CONTAS.BTN_ALTERAR).click()
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Conta alterada')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso')
    })

    it('Não deve criar uma conta com o mesmo nome', () => {
        cy.acessarMenuConta()
        cy.inserirConta('Conta alterada')
        cy.get(loc.CONTAS.BTN_ALTERAR).click()
        cy.get(loc.MESSAGE).should('contain', 'code 400')
    })

    it('Deve criar uma transacao', () => {
        cy.get(loc.MENU.MOVIMENTACAO).click()

        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc')
        cy.get(loc.MOVIMENTACAO.VALOR).type('123')
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Inter')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')

        cy.get(loc.EXTRATO.LINHAS).should('have.length', 7)
        cy.get(loc.EXTRATO.BUSCA_ELEMENTO).should('contain', 'Desc')
    })

    it('Deve validar o saldo', () => {
        cy.get(loc.MENU.HOME).click()
        cy.get(loc.SALDO.SALDO_CONTA).should('contain', '123,00')
    })

    it('Deve remover uma transacao', () => {
        cy.get(loc.MENU.EXTRATO).click()
        cy.get(loc.EXTRATO.REMOVER_ELEMENTO).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')
    })
});