var playerData = db.get('players').value()

function updateTable() {
  db.read()
  playerData = db.get('players').value()
  let accountInfo=""
  accountInfo += (
    "<table id='myTable' border='1' width='700'>" + 
    "<tr><th>First Name</th><th>Last Name</th><th>Account Number</th><th>Point Balance</th><th>Tier Level</th><th>D.O.B.</th></tr>"
  )
  for(let i = 0; i < playerData.length; i++){

    accountInfo += (
      "<tr><td name='firstName'> <input type='text' name='firstName' class='input input1' value='" +playerData[i].firstName+"'onchange='swapValue(this,"+i+")'"+"</td>" +
      "<td> <input type='text' name='lastName' class='input input1' value='"+playerData[i].lastName+"' onchange='swapValue(this,"+i+")'" +"</td>" +
      "<td> <input type='text' name='accountNumber' class='input input1' value='"+playerData[i].accountNumber+"' onchange='swapValue(this,"+i+")'"+"</td>" +
      "<td> <input type='text' name='pointBalance' class='input input1' value='"+playerData[i].pointBalance+"'onchange='swapValue(this,"+i+")'"+"</td>" +
      "<td> <input type='text' name='tierLevel' class='input input1' value='"+playerData[i].tierLevel+"'onchange='swapValue(this,"+i+")'"+"</td>" +
      "<td> <input type='text' name='dateOfBirth' class='input input1' value='"+playerData[i].dateOfBirth +"'onchange='swapValue(this,"+i+")'"+"</td></tr>"
    )
  
  } 
  accountInfo += "</table>"
  document.getElementById('editData').innerHTML = accountInfo
}

function filterTable(value){
  let accountInfo=""
  accountInfo += (
    "<table id='myTable' border='1' width='700'>" + 
    "<tr><th>First Name</th><th>Last Name</th><th>Account Number</th><th>Point Balance</th><th>Tier Level</th><th>D.O.B.</th></tr>"
  )
  for(let i = 0; i < playerData.length; i++){
    if(playerData[i].firstName.toLowerCase().includes(value.toLowerCase()) || playerData[i].lastName.toLowerCase().includes(value.toLowerCase())){
      accountInfo += (
        "<tr><td name='firstName'> <input type='text' name='firstName' class='input input1' value='" +playerData[i].firstName+"'onchange='swapValue(this,"+i+")'"+"</td>" +
        "<td> <input type='text' name='lastName' class='input input1' value='"+playerData[i].lastName+"' onchange='swapValue(this,"+i+")'" +"</td>" +
        "<td> <input type='text' name='accountNumber' class='input input1' value='"+playerData[i].accountNumber+"' onchange='swapValue(this,"+i+")'"+"</td>" +
        "<td> <input type='text' name='pointBalance' class='input input1' value='"+playerData[i].pointBalance+"'onchange='swapValue(this,"+i+")'"+"</td>" +
        "<td> <input type='text' name='tierLevel' class='input input1' value='"+playerData[i].tierLevel+"'onchange='swapValue(this,"+i+")'"+"</td>" +
        "<td> <input type='text' name='dateOfBirth' class='input input1' value='"+playerData[i].dateOfBirth +"'onchange='swapValue(this,"+i+")'"+"</td></tr>"
      )
    }
  } 
  accountInfo += "</table>"
  document.getElementById('editData').innerHTML = accountInfo
}

function searchData(input) {
  filterTable(input.value)
  writeToTerminal("Saved edited player info")
}

function checkDuplicateAccountNumbers(){
  playerData.forEach(player => {
    //TO-DO
  });
}

// this function swaps the old data with the new data
function swapValue(tableElement, i) {
  switch(tableElement.name){
    case 'firstName': {
      playerData[i].firstName = tableElement.value
      break
    }
    case 'lastName': {
      playerData[i].lastName = tableElement.value
      break
    }
    case 'accountNumber': {
      playerData[i].accountNumber = tableElement.value
      checkDuplicateAccountNumbers()
      break
    }
    case 'pointBalance': {
      playerData[i].pointBalance = tableElement.value
      break
    }
    case 'tierLevel': {
      playerData[i].tierLevel = tableElement.value
      break
    }
    case 'dateOfBirth': {
      playerData[i].dateOfBirth = tableElement.value
      break
    }
  }
}

// this function saves the data when the save button is clicked 
function writeToFile(){
  db.set('players', playerData).write()

  document.getElementById('dataSaved').textContent = "Data Saved Successfully!"
  setTimeout(function(){
    document.getElementById('dataSaved').textContent = "";
  },1000);
}

function editPlayers(){
  updateTable()
  document.getElementById('edit-players').style.display = 'block'
  document.getElementById('main-page').style.display = 'none'
  document.getElementById('settings-button').style.visibility = 'hidden'
  document.getElementById('dataSaved').textContent = ""
}

function loadMain(){
  updateTable()
  document.getElementById('edit-players').style.display = 'none'
  document.getElementById('main-page').style.display = 'block'
  document.getElementById('settings-button').style.visibility = 'visible'
}