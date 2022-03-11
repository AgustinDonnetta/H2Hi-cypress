class MeetingSearch {
    getStartDate(){
        return cy.get('.css-120gsus > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input')
    }
    getEndDate(){
        return cy.get(':nth-child(4) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input')
    }
    getMeetingType(){
        return cy.get('#react-select-2-input')
    }
    getSubmitButton(){
        return cy.get('.css-1gp68l1 > :nth-child(2) > .MuiButton-root')
    }
    getReportButton(){
        return cy.get(':nth-child(1) > .css-q34dxg > .MuiButton-root')
    }
    getSuggestedCodesButton(){
        return cy.get(':nth-child(1) > [rowspan="2"] > .css-1lxwves > .MuiButton-root')
    }

}

export default MeetingSearch