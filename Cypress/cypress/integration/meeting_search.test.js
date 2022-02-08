import MeetingSearch from '../support/meetingSearch'

describe('meeting search tests', () => {

    beforeEach(() => {

        // clear LS
        cy.clearLocalStorage()
        
        // login command
        cy.loginTest(Cypress.env('username'), Cypress.env('password'))
        cy.wait(1000)
        cy.visit('/meetings/search')
    })

    const meetingSearch =new MeetingSearch

    it('01 should search for a type 1 meeting', () => {

        // test
        cy.get('#react-select-2-input').type('type').wait(1000).type('{enter}')
        cy.get('.css-1gp68l1 > :nth-child(2) > .MuiButton-root').click()

        // verification
        cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(3)').should('contain' , 'Type 1')
    });

    it('02 should search for a "cypress" meeting', () => {

        // test
        cy.get('input:first').type('Cypress')
        cy.get('.css-1gp68l1 > :nth-child(2) > .MuiButton-root').click()

        // verification
        cy.get('body').should('contain' , 'Cypress')
    });

    it('03 search for a meeting without data', () => {
        
        // test
        cy.get('.css-1gp68l1 > :nth-child(2) > .MuiButton-root').click()

        // verification
        cy.on('window:alert', (str) => {
            expect(str).to.contain(`You must use a filter at least`)
        })

    });

    it('04 search for a meeting using a start date < end date', () => {

        // test
        meetingSearch.getStartDate().type('01022022')
        meetingSearch.getEndDate().type('01012021')
        cy.get('.css-1gp68l1 > :nth-child(2) > .MuiButton-root').click()

        // verification
        cy.on('window:alert', (str) => {
            expect(str).to.contain(`The end date cannot be greater than start date`)
        })
    });

    it('05 search for a meeting using an invalid start date', () => {

        // test
        meetingSearch.getStartDate().type('55886987')
        cy.get('.css-1gp68l1 > :nth-child(2) > .MuiButton-root').click()

        // verification
        cy.on('window:alert', (str) => {
            expect(str).to.contain(`meeting_date: Enter A Valid Date/Time.`)
        })
    });

    it.only('06 search for a meeting using an invalid end date', () => {
        meetingSearch.getEndDate().type('55886987')
        cy.get('.css-1gp68l1 > :nth-child(2) > .MuiButton-root').click()

        // verification
        cy.on('window:alert', (str) => {
            expect(str).to.contain(`meeting_date: Enter A Valid Date/Time.`)
        })
    });
});