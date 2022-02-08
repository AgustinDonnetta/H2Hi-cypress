class Meeting {
    getType(){
        return cy.get('.css-p27s4m > :nth-child(1) > .css-b62m3t-container > .css-7srdd-control > .css-1d8n9bt > .css-nwjfc')
    }
    getLength(){
        return cy.get(':nth-child(2) > .css-b62m3t-container > .css-7srdd-control')
    }
    getDate(){
        return cy.get(':nth-child(8) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input')
    }
    
    

}

export default Meeting