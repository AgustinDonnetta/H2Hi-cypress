
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
        meetingSearch.getMeetingType().type('type').wait(1000).type('{enter}')
        meetingSearch.getSubmitButton().click()

        // verification
        cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(3)').should('contain' , 'Type 1')
    });

    it('02 should search for a "cypress" meeting', () => {

        // test
        cy.get('input:first').type('Cypress')
        meetingSearch.getSubmitButton().click()

        // verification
        cy.get('body').should('contain' , 'Cypress')
    });

    it('03 search for a meeting without data', () => {
        
        // test
        meetingSearch.getSubmitButton().click()

        // verification
        cy.on('window:alert', (str) => {
            expect(str).to.contain(`You must use a filter at least`)
        })

    });

    it('04 search for a meeting using a start date < end date', () => {

        // test
        meetingSearch.getStartDate().type('01022022')
        meetingSearch.getEndDate().type('01012021')
        meetingSearch.getSubmitButton().click()

        // verification
        cy.on('window:alert', (str) => {
            expect(str).to.contain(`The end date cannot be greater than start date`)
        })
    });

    it('05 search for a meeting using an invalid start date', () => {

        // test
        meetingSearch.getStartDate().type('55886987')
        meetingSearch.getSubmitButton().click()

        // verification
        cy.on('window:alert', (str) => {
            expect(str).to.contain(`meeting_date: Enter A Valid Date/Time.`)
        })
        cy.url().should('contain' , '/meetings/search')
    });

    it('06 search for a meeting using an invalid end date', () => {

        // test
        meetingSearch.getEndDate().type('55886987')
        meetingSearch.getSubmitButton().click()

        // verification
        cy.on('window:alert', (str) => {
            expect(str).to.contain(`meeting_date: Enter A Valid Date/Time.`)
        })
        cy.url().should('contain' , '/meetings/search')
    });

    it('07 search for a "cypress" meeting and clicking on report ', () => {

        // test
        cy.get('input:first').type('Cypress')
        meetingSearch.getSubmitButton().click()
        meetingSearch.getReportButton().click()

        // verification
        cy.get('body').should('contain' , 'Suggested Codes')

        // test
        meetingSearch.getSuggestedCodesButton().click()
        
        // verification
        cy.get('.css-prbzrh > .MuiBox-root').should('contain' , 'Codename')
    });


});