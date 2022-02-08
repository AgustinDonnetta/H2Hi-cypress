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
    

}

export default CurrentDatasetView