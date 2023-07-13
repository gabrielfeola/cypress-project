// ! Objeto com todos os locators que serão utilizados no projeto

const locators = {
    LOGIN: {
        USER: '[data-test=email]',
        PASSWORD: '[data-test=passwd]',
        BTN_LOGIN: '.btn'
    },
    MENU: {
        HOME: '[data-test=menu-home]',
        SETTINGS: '[data-test="menu-settings"]',
        RESET: '[href="/reset"]',
        CONTAS: '[href="/contas"]',
        MOVIMENTACAO: '[data-test=menu-movimentacao]',
        EXTRATO: '[data-test=menu-extrato]'
    },
    CONTAS: {
        NOME: '[data-test=nome]',
        BTN_SALVAR: '.btn',
        BTN_ALTERAR: ':nth-child(7) > :nth-child(2) > :nth-child(1) > .far' // * deveria ser utilizado o xPath, para evitar pegar os elementos por posição dessa forma
    },
    MOVIMENTACAO: {
        DESCRICAO: '[data-test=descricao]',
        VALOR: '[data-test=valor]',
        INTERESSADO: '[data-test=envolvido]',
        STATUS: '[data-test=status]',
        BTN_SALVAR: '.btn-primary'
    },
    EXTRATO: {
        LINHAS: '.list-group > li',
        BUSCA_ELEMENTO: '.list-group > :nth-child(7)', // * deveria ser utilizado o xPath, para evitar pegar os elementos por posição dessa forma
        REMOVER_ELEMENTO: ':nth-child(7) > .row > .col > [href="#"] > .far' // * deveria ser utilizado o xPath, para evitar pegar os elementos por posição dessa forma
    },
    SALDO: {
        SALDO_CONTA: 'tbody > :nth-child(1) > :nth-child(2)' // * deveria ser utilizado o xPath, para evitar pegar os elementos por posição dessa forma
    },
    MESSAGE: '.toast-message'
}

export default locators;