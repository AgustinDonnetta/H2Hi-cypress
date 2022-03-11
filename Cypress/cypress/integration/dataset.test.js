import CurrentDatasetView from '../support/currentDatasetView';

describe('Dataset add term tests', () => {
    beforeEach(() => {

        // clear LS
        cy.clearLocalStorage()

        // login command
        cy.loginTest(Cypress.env('username'), Cypress.env('password'))
        cy.wait(1000)
    })
    const currentDatasetView=new CurrentDatasetView();

    it('01 should create, edit, search and delete a term', () => {

        // term add
        cy.termAdd('Hi there! I am Donnie', 'problem', 'positive')
        cy.get('.css-x1tbqu > .MuiButton-root').click()
        
        // search for the term
        cy.get('input[type="text"]:first').type('Hi there! I am Donnie').type('{enter}')

        // verification
        cy.get('body').should('contain' , 'Hi there! I am Donnie')

        // edit term
        currentDatasetView.getEditTermButton().click()
        cy.get('input[name="term"]').type('edited term')
        cy.get('.css-19iiic6 > .MuiButton-root').click()
        cy.wait(1000)
        cy.get('.css-1pg3x2d > .MuiButton-root').click()
        cy.get('.css-x1tbqu > .MuiButton-root').click()

        //verification
        cy.get('body').should('contain' , 'edited term')
        

        // term delete
        currentDatasetView.getDeleteTermButton().click()
        cy.contains('Confirm').click()

        // verification
        cy.get('body').should('not.contain', 'Hi there! I am Donnie')
    });

    it('02 upload a blank term', () => {

        // test
        currentDatasetView.getNewTerm().click()
        cy.get('input[name="term"]').type(' ')
        currentDatasetView.getCodeInput().type('problem').wait(1000).type('{enter}')
        currentDatasetView.getSentimentInput().type('positive').wait(1000).type('{enter}')
        cy.get('.css-rxfqj7 > .MuiButton-root').click()

        // verification
        cy.on('window:alert', (str) => {
            expect(str).to.contain(`term: This Field May Not Be Blank`)
        })
        cy.get('.css-16a4a5q').should('exist')
        
    });

    it('03 upload an empty term', () => {

        // test
        currentDatasetView.getNewTerm().click()
        currentDatasetView.getCodeInput().type('problem').wait(1000).type('{enter}')
        currentDatasetView.getSentimentInput().type('positive').wait(1000).type('{enter}')
        cy.get('.css-rxfqj7 > .MuiButton-root').click()
        cy.contains('Continue').click()

        //verification
        cy.get('body').should('contain' , 'Term is a required field')
    });

    it('04 upload a term with more than 250 char', () => {

        //test
        currentDatasetView.getNewTerm().click()
        cy.get('input[name="term"]').type('is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, whis simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standardssd')
        currentDatasetView.getCodeInput().type('Problem').wait(1000).type('{enter}')
        currentDatasetView.getSentimentInput().type('positive').wait(1000).type('{enter}')
        cy.get('.css-rxfqj7 > .MuiButton-root').click()

        // verification           
        cy.on('window:alert', (str) => {
            expect(str).to.contain(`term: Ensure This Field Has No More Than 250 Characters`)
        })
        cy.get('.css-16a4a5q').should('exist')

    });

    it('05 upload a term without a tag', () => {

        // test
        currentDatasetView.getNewTerm().click()
        cy.get('input[name="term"]').type('lets play')
        currentDatasetView.getSentimentInput().type('positive').wait(1000).type('{enter}')
        cy.get('.css-rxfqj7 > .MuiButton-root').click()
        cy.contains('Continue').click()

        // verification
        cy.get('body').should('contain' , 'Code is a required field')
    });

    it('06 upload an empty term without a code and sentiment', () => {

        // test
        currentDatasetView.getNewTerm().click()
        cy.get('.css-rxfqj7 > .MuiButton-root').click()
        cy.contains('Continue').click()

        // verification
        cy.get('body').should('contain' , 'Code is a required field')
        cy.get('body').should('contain' , 'Term is a required field')
        cy.get('body').should('contain' , 'Sentiment is a required field')
    });

    it('07 should edit a term without changing anything', () => {

        // test
        cy.get(':nth-child(1) > .css-q34dxg > :nth-child(1)').click()
        cy.contains('Continue').click()

        // verification
        cy.get('body').should('contain', 'A term has been edited on the dataset successfully')
        cy.request('/datasets/current/dataset-rows').then((resp) => {
            expect(resp.status).to.eq(200)
        })
    });

    it('08 upload a term without a sentiment', () => {

        // test
        currentDatasetView.getNewTerm().click()
        cy.get('input[name="term"]').type('Term without sentiment')
        currentDatasetView.getCodeInput().type('problem').wait(1000).type('{enter}')
        cy.get('.css-rxfqj7 > .MuiButton-root').click()

        // verification
        cy.get('body').should('contain' , 'Sentiment is a required field')
    });
    
    it('09 should search for Procedural suggestion codes', () => {

        // test
        currentDatasetView.getCodeSearchInput().type('Procedural suggestion').type('{downarrow}').wait(1000).type('{enter}')

        // verification
        cy.get('body').should('contain', 'Procedural suggestion')
    });

    it('10 should sort by Code-ASC', () => {

        // test
        currentDatasetView.getSortByBox().click().wait(1000).type('{uparrow}{uparrow}{enter}}')

        // verification
        cy.get('body').should('contain', 'Action planning')
    });

    it('11 should sort by Code-DESC', () => {

        // test
        currentDatasetView.getSortByBox().click().wait(1000).type('{uparrow}{enter}}')

        // verification
        cy.get('body').should('contain', 'Task distribution')
    });

});