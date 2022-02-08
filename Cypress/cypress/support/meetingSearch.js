class MeetingSearch {
    getStartDate(){
        return cy.get('.css-120gsus > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input')
    }
    getEndDate(){
        return cy.get(':nth-child(4) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input')
    }
    

}

export default MeetingSearch