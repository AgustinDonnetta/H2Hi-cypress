import CurrentDatasetView from '../support/currentDatasetView';
import 'cypress-file-upload';

Cypress.Commands.add('login', (username, password) => {

    cy.visit("/");

    const user = {
      password: Cypress.env('password'),
      username: Cypress.env('username'),
    };

    cy.session([user.username, user.password], () => {
      cy.request({
        method: "POST",
        url: Cypress.env('api_server') + "/login",
        body: user,
        headers: {
          h2pky: Cypress.env('api_key'),
          Accept: "application/json",
        },
      }).then(() => { window.localStorage.setItem('isLoggedIn', true)})
      
    })
    cy.visit("/datasets/current")
})


Cypress.Commands.add('loginTest', (username, password) => {
  cy.visit('/')
  cy.get('input[name="username"]').type(username)
  cy.get('input[name="password"]').type(password)
  cy.get('.MuiButton-root').click()
})

Cypress.Commands.add('termAdd', (term, code) => {
  const currentDatasetView=new CurrentDatasetView();
  currentDatasetView.getNewTerm().click()
  cy.get('input[name="term"]').type(term)
  cy.get('#react-select-4-input').type(code).wait(1000).type('{enter}')
  cy.get('.css-rxfqj7 > .MuiButton-root').click()
  cy.wait(1000)
  cy.get('.css-1pg3x2d > .MuiButton-root').click()
  
})





