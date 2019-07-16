//db
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

//this function will let the admin edit the player's information
var playerData = db.get('players').value()

document.addEventListener('DOMContentLoaded', function() {
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
}, false);

// does not works, need to edit
function searchData() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
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
  console.log(playerData)
  db.set('players', playerData).write()
  console.log(db.get('players').value())
  document.getElementById('dataSaved').textContent = "Data Saved Successfully!"
}