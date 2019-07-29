function convertPointsToDollars(){
    //im sorry about this code
    //god its horrible
    let outHTML = "<h4 style='color: #f5f5f5'>Points To Dollars</h4>" + 
    "<input type='text' size='6' placeholder='points' id='points' onkeyup='validatePointsToDollars()'>"+
    "<h2> : </h2>" +
    "<input type='text' size='6' placeholder='dollars' id='dollars' onkeyup='validatePointsToDollars()'></br>" +
    "<button id='submit-ptd' class='button button1 red-but onclick='submitPointsToDollars()'>save</button>"
    document.getElementById('pointsToDollarsContainer').innerHTML = outHTML

    document.getElementById('points').value = db.get('pointsToDollars').value()
    document.getElementById('dollars').value = 1
}

function submitPointsToDollars(){
    let points = document.getElementById('points').value
    let dollars = document.getElementById('dollars').value
    db.set('pointsToDollars', points/dollars).write()
    let outHTML = "<h4 style='color: #f5f5f5'>Points To Dollars</h4>" + 
    "<h2 id='pointsToDollars'>" + (points/dollars).toFixed(2) + " : 1</h1>" + 
    "</br>" +
    "<button class='button button1 red-but' onclick='convertPointsToDollars()'>edit</button>"
    
    document.getElementById('pointsToDollarsContainer').innerHTML = outHTML
    writeToTerminal(`Saved points-to-dollar ratio : ${points}:$${dollars}`)    
}

function validatePointsToDollars(){
    console.log('here')
    let points = document.getElementById('points').value
    let dollars = document.getElementById('dollars').value
    if(isNaN(points) || isNaN(dollars) || dollars === "" || points === ""){
        document.getElementById('submit-ptd').disabled = true
    } else {
        document.getElementById('submit-ptd').disabled = false
    }
}