var playerData = db.get('players').value()

function updateTable() {
  db.read()
  playerData = db.get('players').value()
  let accountInfo=""

  accountInfo += (
    "<table id='myTable' border='1' width='700'>" + 
    "<tr><th>First Name</th><th>Last Name</th><th>Account Number</th><th>Point Balance</th><th>Tier Level</th><th>D.O.B.</th>"+
    "<th>Comp Balance</th><th>Promo2 Balance</th><th>is InActive</th> <th>Is Banned</th> <th>Is PinLocked</th></tr>"
  )
  for(let i = 0; i < playerData.length; i++){

    accountInfo += (
      "<tr><td name='firstName'> <input type='text' name='firstName' class='input input1' value='" +playerData[i].firstName+"'onchange='swapValue(this,"+i+")'"+"</td>" +
      "<td> <input type='text' name='lastName' class='input input1' value='"+playerData[i].lastName+"' onchange='swapValue(this,"+i+")'" +"</td>" +
      "<td> <input type='text' name='accountNumber' class='input input1' value='"+playerData[i].accountNumber+"' onchange='swapValue(this,"+i+")'"+"</td>" +
      "<td> <input type='text' name='pointBalance' class='input input1' value='"+playerData[i].pointBalance+"'onchange='swapValue(this,"+i+")'"+"</td>" +
      "<td> <input type='text' name='tierLevel' class='input input1' value='"+playerData[i].tierLevel+"'onchange='swapValue(this,"+i+")'"+"</td>" +
      "<td> <input type='text' name='dateOfBirth' class='input input1' value='"+playerData[i].dateOfBirth +"'onchange='swapValue(this,"+i+")'"+"</td>"+
      "<td> <input type='text' name='compBalance' class='input input1' value='"+playerData[i].compBalance +"'onchange='swapValue(this,"+i+")'"+"</td>"+
      "<td> <input type='text' name='promo2Balance' class='input input1' value='"+playerData[i].promo2Balance +"'onchange='swapValue(this,"+i+")'"+"</td>"+
      "<td> <label><input class='player-bools' id='idActive"+i+"' type='checkbox' value='"+playerData[i].isInActive +"' name='isInActive' onchange='saveCheckbox(this, "+i+")'> True</label> </td>"+
      "<td> <label><input class='player-bools' id='idBanned"+i+"' type='checkbox' value='"+playerData[i].isBanned +"' name='isBanned' onchange='saveCheckbox(this, "+i+")'> True</label> </td>"+
      "<td> <label><input class='player-bools' id='idLocked"+i+"' type='checkbox' value='"+playerData[i].isPinLocked +"' name='isPinLocked' onchange='saveCheckbox(this, "+i+")'> True</label> </td></tr>"
    )
  
  } 
  accountInfo += "</table>"
  
  document.getElementById('editData').innerHTML = accountInfo
  updateCheckboxes()
}

function filterTable(value){
  let accountInfo=""
  accountInfo += (
    "<table id='myTable' border='1' width='700'>" + 
    "<tr><th>First Name</th><th>Last Name</th><th>Account Number</th><th>Point Balance</th><th>Tier Level</th><th>D.O.B.</th>"+
    "<th>Comp Balance</th><th>Promo2 Balance</th><th>is InActive</th> <th>Is Banned</th> <th>Is PinLocked</th></tr>"
  )
  for(let i = 0; i < playerData.length; i++){
    if(playerData[i].firstName.toLowerCase().includes(value.toLowerCase()) || playerData[i].lastName.toLowerCase().includes(value.toLowerCase())){
      accountInfo += (
        "<tr><td name='firstName'> <input type='text' name='firstName' class='input input1' value='" +playerData[i].firstName+"'onchange='swapValue(this,"+i+")'"+"</td>" +
        "<td> <input type='text' name='lastName' class='input input1' value='"+playerData[i].lastName+"' onchange='swapValue(this,"+i+")'" +"</td>" +
        "<td> <input type='text' name='accountNumber' class='input input1' value='"+playerData[i].accountNumber+"' onchange='swapValue(this,"+i+")'"+"</td>" +
        "<td> <input type='text' name='pointBalance' class='input input1' value='"+playerData[i].pointBalance+"'onchange='swapValue(this,"+i+")'"+"</td>" +
        "<td> <input type='text' name='tierLevel' class='input input1' value='"+playerData[i].tierLevel+"'onchange='swapValue(this,"+i+")'"+"</td>" +
        "<td> <input type='text' name='dateOfBirth' class='input input1' value='"+playerData[i].dateOfBirth +"'onchange='swapValue(this,"+i+")'"+"</td>"+
        "<td> <input type='text' name='compBalance' class='input input1' value='"+playerData[i].compBalance +"'onchange='swapValue(this,"+i+")'"+"</td>"+
        "<td> <input type='text' name='promo2Balance' class='input input1' value='"+playerData[i].promo2Balance +"'onchange='swapValue(this,"+i+")'"+"</td>"+
        "<td> <label><input class='player-bools' id='idActive"+i+"' type='checkbox' value='"+playerData[i].isInActive +"' name='isInActive' onchange='saveCheckbox(this, "+i+")'> True</label> </td>"+
        "<td> <label><input class='player-bools' id='idBanned"+i+"' type='checkbox' value='"+playerData[i].isBanned +"' name='isBanned' onchange='saveCheckbox(this, "+i+")'> True</label> </td>"+
        "<td> <label><input class='player-bools' id='idLocked"+i+"' type='checkbox' value='"+playerData[i].isPinLocked +"' name='isPinLocked' onchange='saveCheckbox(this, "+i+")'> True</label> </td></tr>"
      )
    }
  } 
  accountInfo += "</table>"

  document.getElementById('editData').innerHTML = accountInfo
  updateCheckboxes()
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
    case 'compBalance': {
      playerData[i].compBalance = tableElement.value
      break
    }
    case 'promo2Balance': {
      playerData[i].promo2Balance = tableElement.value
      break
    }
  }
}

function updateCheckboxes(){

  let checkboxes = document.getElementsByClassName("player-bools")
  
  for(let i = 0; i < checkboxes.length; i++){
      if(checkboxes[i].value === "TRUE"){
          checkboxes[i].checked = true;  
      } else {
      checkboxes[i].checked = false;    
      }
  }

}

function saveCheckbox(element, i){

  switch(element.name){

    case 'isInActive':{

      var checkBox = document.getElementById(element.id).checked
      if(checkBox === true){
        playerData[i].isInActive = "TRUE"
      } else{
        playerData[i].isInActive = "FALSE"
      }
      break
    }

    case 'isBanned':{
      var checkBox = document.getElementById(element.id).checked

      if(checkBox === true){
        playerData[i].isBanned = "TRUE"
      } else{
        playerData[i].isBanned = "FALSE"
      }
      break
    }

    case 'isPinLocked':{
      var checkBox = document.getElementById(element.id).checked

      if(checkBox === true){
        playerData[i].isPinLocked = "TRUE"
      } else{
        playerData[i].isPinLocked = "FALSE"
      }
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