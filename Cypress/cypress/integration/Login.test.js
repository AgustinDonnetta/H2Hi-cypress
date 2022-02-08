describe('Login tests', () => {

  beforeEach(() => {

    // clear LS
    cy.clearLocalStorage()
  })
  
      
    it.only('01 should login into the app', () => {
      // test
      cy.loginTest(Cypress.env('username'), Cypress.env('password'))
      // verification
      cy.get('body').should('contain' , 'Log out')  
    });

    it('02 login with an invalid email', () => {
      // test
      cy.loginTest('asdn@gmail.com', Cypress.env('password'))

      // verification
      cy.on('window:alert', (str) => {
        expect(str).to.equal(`Wrong password or username`)
      })
    });

    it('03 login not using an email format', () => {
      // test
      cy.loginTest('asdf', 'fewnfjewnfsovgws')

      //verification
      cy.get('body').should('contain', 'Email must be a valid email')
    });

    it('04 login using an incorrect password format', () => {
      // test
      cy.loginTest('asfaqf@gmail.com', '111554488')

      // verification
      cy.on('window:alert', (str) => {
        expect(str).to.equal(`Wrong password or username`)
      })
    });

    it('05 login without using a password', () => {
      // test
      cy.loginTest('asfwqm@gmail.com', '{enter}')

      // verification
      cy.get('body').should('contain', 'Password is a required field')
      
    });

    it('06 login without using an email', () => {
      // test
      cy.loginTest('{enter}', 'adfsvgg23')

      // verification
      cy.get('body').should('contain', 'Email is a required field')
      
    });

    it('07 login without using username nor password ', () => {
      // test
      cy.loginTest(' ', ' ')

      // verification
      cy.get('body').should('contain', 'Email must be a valid email')
      cy.get('body').should('contain', 'Password must be at least 8 characters')
    });

    it('08 login using an incorrect password format', () => {
      // test
      cy.loginTest('asfaqf@gmail.com', 'asfddewa')

      // verification
      cy.on('window:alert', (str) => {
        expect(str).to.equal(`Wrong password or username`)
      })
    });

    it('09 login using an incorrect password format', () => {
      // test
      cy.loginTest('asfaqf@gmail.com', 'Pfsfddewa1')

      // verification
      cy.on('window:alert', (str) => {
        expect(str).to.equal(`Wrong password or username`)
      })
    });

    it('10 login using an incorrect password lenght', () => {
      // test
      cy.loginTest('asfaqf@gmail.com', 'asddw')

      // verification
      cy.get('body').should('contain', 'Password must be at least 8 characters')
    });

    it('11 login using an incorrect password lenght', () => {
      // test
      cy.loginTest('asfaqf@gmail.com', 'adsaffqaadsaffqaadsaffqaadsaffqaadsaffqaadsaffqaadsaffqa')

      //verification
      cy.get('body').should('contain', 'Password must be at most 32 characters')
    });
});

