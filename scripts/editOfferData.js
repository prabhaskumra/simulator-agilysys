var offersData = db.get('offers').value()
var playerData = db.get('players').value()
let offersInfo = ""

// let mergedData = []

function updateOfferTable(){
    db.read()
    offersData = db.get('offers').value()
    
    offersInfo = ""
    offersInfo +=(
        "<table id='offerTable' border='1' style='width: 700px'>" + 
        "<tr><th>Account Number</th><th>Offer Name</th><th>Offer #</th><th>Offer Amount</th></tr>"
    )

    for(let i = 0; i < offersData.length; i++){

        offersInfo +=(
            "<tr><td><input type='text' name='accountName' class='input input1' value='" + offersData[i].AccountNumber + "' onchange='swapOffer(this,"+i+")'></td>" + 
            "<td><input type='text' name='offerName' class='input input1' value='" + offersData[i].OfferName + "' onchange='swapOffer(this,"+i+")'></td>" + 
            "<td><input type='text' name='offerCode' class='input input1' value='" + offersData[i].OfferCode + "' onchange='swapOffer(this,"+i+")'></td>" + 
            "<td><input type='text' name='offerValue' class='input input1' value='" + offersData[i].OfferValue + "' onchange='swapOffer(this,"+i+")'></td></tr>"        
            )
    }
    offersInfo += "</table>"

    document.getElementById('editOffer').innerHTML = offersInfo
}

function searchOfferTable(input) {
    filterOfferTable(input.value)
  }

function filterOfferTable(value){
    offersData = db.get('offers').value()
    offersInfo = ""
    offersInfo +=(
        "<table id='offerTable' border='1' style='width: 700px'>" + 
        "<tr><th>Account Number</th><th>Offer Name</th><th>Offer #</th><th>Offer Amount</th></tr>"
    )

    for(let i = 0; i < offersData.length; i++){
        if(String(offersData[i].AccountNumber).includes(value))
            offersInfo +=(
                "<tr><td><input type='text' name='accountName' class='input input1' value='" + offersData[i].AccountNumber + "' onchange='swapOffer(this,"+i+")'></td>" + 
                "<td><input type='text' name='offerName' class='input input1' value='" + offersData[i].OfferName + "' onchange='swapOffer(this,"+i+")'></td>" + 
                "<td><input type='text' name='offerCode' class='input input1' value='" + offersData[i].OfferCode + "' onchange='swapOffer(this,"+i+")'></td>" + 
                "<td><input type='text' name='offerValue' class='input input1' value='" + offersData[i].OfferValue + "' onchange='swapOffer(this,"+i+")'></td></tr>"        
                )
    }
    offersInfo += "</table>"

    document.getElementById('editOffer').innerHTML = offersInfo
}

function swapOffer(tableElement, i) {
    switch(tableElement.name){
      case 'accountName': {
        offersData[i].AccountNumber = tableElement.value
        break
      }
      case 'offerName': {
        offersData[i].OfferName = tableElement.value
        break
      }
      case 'offerCode': {
        offersData[i].OfferCode = tableElement.value
        break
      }
      case 'offerValue': {
        offersData[i].OfferValue = tableElement.value
        break
      }
    }
  }

function saveOffers(){
    db.set('offers', offersData).write()

    document.getElementById('offerDataSaved').textContent = "Data Saved Successfully!"
    setTimeout(function(){
        document.getElementById('offerDataSaved').textContent = "";
    },1000);
}

function playerOffersTable(){
    document.getElementById('edit-offers').style.display = 'block'
    document.getElementById('main-page').style.display = 'none'
    document.getElementById('settings-button').style.visibility = 'hidden'
}


function editOfferData(){
    updateOfferTable()
    document.getElementById('edit-offers').style.display = 'block'
    document.getElementById('main-page').style.display = 'none'
    document.getElementById('settings-button').style.visibility = 'hidden'
    // document.getElementById('offerDataSaved').textContent = ""
}

function loadOfferMain(){
    //updateOfferTable()
    document.getElementById('edit-offers').style.display = 'none'
    document.getElementById('main-page').style.display = 'block'
    document.getElementById('settings-button').style.visibility = 'visible'
}