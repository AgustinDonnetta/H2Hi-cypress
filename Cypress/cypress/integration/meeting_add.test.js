import Meeting from '../support/meeting'

describe('meeting creation tests', () => {
    beforeEach(() => {

        // clear LS
        cy.clearLocalStorage()
        
        // login command
        cy.loginTest(Cypress.env('username'), Cypress.env('password'))
        cy.wait(1000)
        cy.visit('/meetings/create')
    })

    const meeting=new Meeting();
    function setMeetingName() {
        cy.get('input[name="name"]').type('Cypress Test')
    }

    it('01 should create a meeting', () => {   

        // test
        setMeetingName()
        meeting.getType().wait(1000).type('{downarrow}{enter}')
        meeting.getLength().type('{downarrow}{enter}')
        cy.get('#react-select-4-input').type('hugo').wait(1000).type('{enter}')
        meeting.getDate().type('01192022')
        cy.get('input[type=file]').attachFile('/files/test2.mp3')
        cy.intercept(
            "POST", 
            Cypress.env('api_server') + "/meetings"
        ).as('meeting-create')   
        //cy.get('.css-d2oo9m > .MuiButton-root').click()
        cy.wait('@meeting-create')
        
    });

    it('02 upload a meeting without any data', () => {

        // test
        cy.get('.css-d2oo9m > .MuiButton-root').click()

        // verification
        cy.get('body').should('contain', 'Meeting name is a required field')
                      .should('contain', 'Meeting type is a required field')
                      .should('contain', 'Meeting length is a required field')
                      .should('contain', 'Meeting date is a required field')
                      .should('contain', 'You need to provide a file')

    });

    it('03 upload a meeting without the name', () => {

        // test
        meeting.getType().wait(1000).type('{downarrow}{enter}')
        meeting.getLength().type('{downarrow}{enter}')
        cy.get('#react-select-4-input').type('hugo').wait(1000).type('{enter}')
        meeting.getDate().type('01192022')
        cy.get('input[type=file]').attachFile('/files/test2.mp3')
        cy.get('.css-d2oo9m > .MuiButton-root').click()
        

        // verification
        cy.get('body').should('contain', 'Meeting name is a required field')
    });

    it('04 upload a meeting without the type', () => {

        // test
        cy.get('input[name="name"]').type('Cypress Test Meeting')
        meeting.getLength().type('{downarrow}{enter}')
        cy.get('#react-select-4-input').type('hugo').wait(1000).type('{enter}')
        meeting.getDate().type('01192022')
        cy.get('input[type=file]').attachFile('/files/test2.mp3')
        cy.get('.css-d2oo9m > .MuiButton-root').click()

        // verification
        cy.get('body').should('contain', 'Meeting type is a required field')
    });

    it('05 upload a meeting without the planned length', () => {
        
        // test
        cy.get('input[name="name"]').type('Cypress Test Meeting')
        meeting.getType().wait(1000).type('{downarrow}{enter}')
        cy.get('#react-select-4-input').type('hugo').wait(1000).type('{enter}')
        meeting.getDate().type('01192022')
        cy.get('input[type=file]').attachFile('/files/test2.mp3')
        cy.get('.css-d2oo9m > .MuiButton-root').click()

        // verification
        cy.get('body').should('contain', 'Meeting length is a required field')
    });

    it('06 upload a meeting without a participant', () => {
        
        // test
        cy.get('input[name="name"]').type('Cypress Test Meeting')
        meeting.getType().wait(1000).type('{downarrow}{enter}')
        meeting.getLength().type('{downarrow}{enter}')
        meeting.getDate().type('01192022')
        cy.get('input[type=file]').attachFile('/files/test2.mp3')
        cy.get('.css-d2oo9m > .MuiButton-root').click()

        // verification
        cy.on('window:alert', (str) => {
            expect(str).to.equal(`You must select one participant at least`)
        })
    });

    it('07 upload a meeting without a date', () => {

        // test
        cy.get('input[name="name"]').type('Cypress Test Meeting')
        meeting.getType().wait(1000).type('{downarrow}{enter}')
        meeting.getLength().type('{downarrow}{enter}')
        cy.get('#react-select-4-input').type('hugo').wait(1000).type('{enter}')
        cy.get('input[type=file]').attachFile('/files/test2.mp3')
        cy.get('.css-d2oo9m > .MuiButton-root').click()

        // verification
        cy.get('body').should('contain', 'Meeting date is a required field')
    });

    it('08 upload a meeting without an audio file', () => {
        
        // test
        cy.get('input[name="name"]').type('Cypress Test Meeting')
        meeting.getType().wait(1000).type('{downarrow}{enter}')
        meeting.getLength().type('{downarrow}{enter}')
        cy.get('#react-select-4-input').type('hugo').wait(1000).type('{enter}')
        meeting.getDate().type('01192022')
        cy.get('.css-d2oo9m > .MuiButton-root').click()

        // verification
        cy.get('body').should('contain', 'You need to provide a file')
    });

    it('09 upload a meeting with an invalid date', () => {
        
        // test
        cy.get('input[name="name"]').type('Cypress Test Meeting')
        meeting.getType().wait(1000).type('{downarrow}{enter}')
        meeting.getLength().type('{downarrow}{enter}')
        cy.get('#react-select-4-input').type('hugo').wait(1000).type('{enter}')
        meeting.getDate().type('551154')
        cy.get('input[type=file]').attachFile('/files/test2.mp3')
        cy.get('.css-d2oo9m > .MuiButton-root').click()

        // verification
        cy.get('body').should('contain', 'Invalid date')
    });

    it('10 upload a meeting with an invalid date format', () => {
        
        // test
        cy.get('input[name="name"]').type('Cypress Test Meeting')
        meeting.getType().wait(1000).type('{downarrow}{enter}')
        meeting.getLength().type('{downarrow}{enter}')
        cy.get('#react-select-4-input').type('hugo').wait(1000).type('{enter}')
        meeting.getDate().type('121154')
        cy.get('input[type=file]').attachFile('/files/test2.mp3')
        cy.get('.css-d2oo9m > .MuiButton-root').click()

        // verification
        cy.on('window:alert', (str) => {
            expect(str).to.contain(`meeting_date: Datetime Has Wrong Format.`)
        })
        
    });
});