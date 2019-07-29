function editRetailRating(){
//pretty much copy and paste code from convertPointsToDollars
    let outHTML = "<h4 style='color: #f5f5f5'>Retail Rating</h4>" + 
    "<input type='text' size='6' placeholder='points' id='retail-points' onkeyup='validateRetailRating()'>"+
    "<h2> : </h2>" +
    "<input type='text' size='6' placeholder='dollars' id='retail-dollars' onkeyup='validateRetailRating()'></br>" +
    "<button id='submit-retail' class='button button1 red-but' onclick='submitRetailRating()'>save</button>"
    document.getElementById('retailContainer').innerHTML = outHTML

    document.getElementById('retail-points').value = db.get('retailRating').value()
    document.getElementById('retail-dollars').value = 1
}

function submitRetailRating(){
    let points = document.getElementById('retail-points').value
    let dollars = document.getElementById('retail-dollars').value
    db.set('retailRating', points/dollars).write()
    let outHTML = "<h4 style='color: #f5f5f5'>Retail Rating</h4>" + 
    "<h2 id='retail-rating'>" + (points/dollars).toFixed(2) + " : 1</h1>" + 
    "</br>" +
    "<button class='button button1 red-but' onclick='editRetailRating()'>edit</button>"
    
    document.getElementById('retailContainer').innerHTML = outHTML
    writeToTerminal(`Saved retail rating ratio : ${points}:$${dollars}`)    
}

function validateRetailRating(){
    let points = document.getElementById('retail-points').value
    let dollars = document.getElementById('retail-dollars').value
    if(isNaN(points) || isNaN(dollars) || dollars === "" || points === ""){
        document.getElementById('submit-retail').disabled = true
    } else {
        document.getElementById('submit-retail').disabled = false
    }
}