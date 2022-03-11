class CurrentDatasetView {
    getNewTerm(){
        return cy.get('.css-lgk7oi > :nth-child(2) > :nth-child(1) > .MuiBox-root > .MuiButton-root')
    }
    getDeleteTermButton(){
        return cy.get(':nth-child(1) > .css-q34dxg > :nth-child(2) > .MuiButton-root > [data-testid="DeleteIcon"]')
    }
    getEditTermButton(){
        return cy.get(':nth-child(1) > .css-q34dxg > :nth-child(1) > [data-testid="ModeEditIcon"]')
    }
    getCodeInput(){
        return cy.get('#react-select-4-input')
    }
    getSentimentInput(){
        return cy.get('#react-select-5-input')
    }
    getCodeSearchInput(){
        return cy.get('#react-select-2-input')
    }
    getSortByBox(){
        return cy.get(':nth-child(4) > .css-x3ifec-control > .css-1wy0on6')
    }
}

export default CurrentDatasetView