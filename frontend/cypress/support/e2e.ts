import './commands'

// ignore next redirect errors
Cypress.on('uncaught:exception', (err, runnable) => !err.message.match('NEXT_REDIRECT'))
