function convertPointsToDollars(){
    //im sorry about this code
    outHTML = "<h4 style='color: #f5f5f5'>Points To Dollars</h4>" + 
    "<input type='text' size='6' placeholder='points'>"+
    "<h2> : </h2>" +
    "<input type='text' size='6' placeholder='dollars'></br>" +
    "<button class='button button1' onclick='convertPointsToDollars()'>save</button>"
    
    document.getElementById('pointsToDollarsContainer').innerHTML = outHTML
}