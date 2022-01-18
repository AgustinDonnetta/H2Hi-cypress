describe('Login tests', () => {
    beforeEach(() => {
        Cypress.Cookies.defaults({
            preserve: "refresh_token"
          })
      });
      
    it('01 should login into the app', () => {
       
        cy.visit('/login')
    
        const user = {
            password: 'admin123',
            username: 'admin@H2HI.com',
        };

    cy.request(
        {
            method: 'POST',
            url: 'https://api-dev.h2hi.quorumit.com/api/v1/login',
            body: user,
            headers : {
                'h2pky': '1ctkBQArCD59gIkXkY2Y1DAV',
                'Accept': 'application/json',
            }
        }).then((cookie) => {
        cy.getCookie('refresh_token', cookie.body.token)
        Cypress.Cookies.defaults({
            preserve: cookie.body.token,
          })
        console.log(cookie)
        

        cy.visit('/dataset/current')
         
        
     });

    })

});

