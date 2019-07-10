const fs = require('fs')
const path = require('path')

//this function will let the admin edit the player's information
var playerData = JSON.parse(fs.readFileSync(path.join('./data.json')),'utf8')


function myFunction() {
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


function populateTable(){

    let accountInfo=""
    accountInfo += (
      "<table border='1' width='700'>" + 
      "<tr><th>Name</th><th>Account Number</th><th>Point Balance</th><th>Tier Level</th><th>D.O.B.</th></tr>"
    )
    for(let i = 0; i < playerData.length; i++){

      accountInfo += (
        "<tr><td contenteditable='true'>" + playerData[i].firstName + playerData[i].lastName + "</td>" +
        "<td contenteditable='true'>" + playerData[i].accountNumber + "</td>" +
        "<td contenteditable='true'>" + playerData[i].pointBalance + "</td>" +
        "<td contenteditable='true'>" + playerData[i].tierLevel + "</td>" +
        "<td contenteditable='true'>" + playerData[i].dateOfBirth + "</td>"
      )
    
    } 
    accountInfo += "</table>"
    document.getElementById('editData').innerHTML = accountInfo
    //console.log('YAYA')
    //console.log(playerData)
}

