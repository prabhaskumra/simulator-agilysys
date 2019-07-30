var oldOfferData = db.get('offers').value()
var newOffer = {}
var offerFlags = {}
var startTime, endTime


// creates new object for the new offer and check flags
function addNewOffer(){
    
    oldOfferData = db.get('offers').value()
    startTime = "00:00" 
    endTime = "23:59"

    newOffer = {
        "AccountNumber": "",
        "OfferCode": "",
        "OfferName": "",
        "OfferValue": "",
        "OfferStartDate": "",
        "OfferEndDate": ""
      }

    offerFlags = {
        "AccountNumber": false,
        "OfferCode": false,
        "OfferName": false,
        "OfferValue": false,
        "OfferStartDate": false,
        "OfferStartTime": true,
        "OfferEndDate": false,
        "OfferEndTime": true
    }
}

// loading add offer window
function loadAddOffer(){
    document.getElementById('add-offer').style.display = 'block'
    document.getElementById('edit-offers').style.display = 'none'
    addNewOffer()
    document.getElementById("save-offer-button").disabled = true
}

// loading back "edit offer window"
function loadAddOfferMain(){
    document.getElementById('add-offer').style.display = 'none'
    document.getElementById('edit-offers').style.display = 'block'

}

// saves the new offer added to the offers array
function saveNewOffer(inputElement){
    updateOfferTimes()
    oldOfferData.push(newOffer)
    db.set('offers', oldOfferData).write()
    updateOfferTable()
    addNewOffer()
    checkOfferFlags()

    document.getElementById('save-new-offer').textContent = "New Offer Added Successfully!";
    setTimeout(function(){
        document.getElementById('save-new-offer').textContent = "";
    },3000);

    document.getElementById("offer-form").reset();
    document.getElementById("offer-data-status").innerText = "Offer Data ✔️"
    isAppReady()
}

// updates the values added in the form based on their names. In a switch statement
function enterNewOffer(inputElement){

    switch(inputElement.name){
        case 'offerAccountNumber':{
            newOffer.AccountNumber = inputElement.value

            // checks if the value is an empty function
            if(/\S/.test(newOffer.AccountNumber))
                offerFlags.AccountNumber = true
            else
                offerFlags.AccountNumber = false

            checkOfferFlags()
            break
        }
        case 'newOfferCode':{
            newOffer.OfferCode = inputElement.value

            if(/\S/.test(newOffer.OfferCode))
                offerFlags.OfferCode = true
            else
                offerFlags.OfferCode = false

            checkOfferFlags()
            break
        }
        case 'newOfferName':{
            newOffer.OfferName = inputElement.value

            if(/\S/.test(newOffer.OfferName))
                offerFlags.OfferName = true
            else
                offerFlags.OfferName = false

            checkOfferFlags()
            break
        }
        case 'newOfferValue':{
            newOffer.OfferValue = inputElement.value

            if(/\S/.test(newOffer.OfferValue))
                offerFlags.OfferValue = true
            else
                offerFlags.OfferValue = false
                
            checkOfferFlags()
            break
        }
        case 'offerStartDate':{

            if(/\S/.test(inputElement.value))
                offerFlags.OfferStartDate = true
            else
                offerFlags.OfferStartDate = false

            // change the date format
            var str = inputElement.value.split("-")
            newOffer.OfferStartDate = str[1] + "/" + str[2] + "/" + str[0]

            checkOfferFlags()
            break
        }
        case 'offerStartTime':{

            if(/\S/.test(inputElement.value))
                offerFlags.OfferStartTime = true
            else
                offerFlags.OfferStartTime = false

            startTime = inputElement.value

            checkOfferFlags()
            break
        }
        case 'offerEndDate':{

            if(/\S/.test(inputElement.value))
                offerFlags.OfferEndDate = true
            else
                offerFlags.OfferEndDate = false

            var str = inputElement.value.split("-")
            newOffer.OfferEndDate = str[1] + "/" + str[2] + "/" + str[0]
    
            checkOfferFlags()
            break
        }
        case 'offerEndTime':{

            if(/\S/.test(inputElement.value))
                offerFlags.OfferEndTime = true
            else
                offerFlags.OfferEndTime = false

            endTime = inputElement.value
            checkOfferFlags()
            break
        }

    }
}

// checks if all the field in the form are not changed
function checkOfferFlags(){
    if(offerFlags.AccountNumber && offerFlags.OfferCode && offerFlags.OfferName && 
        offerFlags.OfferValue && offerFlags.OfferStartDate  && offerFlags.OfferEndDate &&
            offerFlags.OfferStartTime && offerFlags.OfferEndTime)
            document.getElementById("save-offer-button").disabled = false
    else
        document.getElementById("save-offer-button").disabled = true
}

// combines the offer dates with the offer times
function updateOfferTimes(){
    newOffer.OfferStartDate +=  " " + startTime + ":00"
    newOffer.OfferEndDate += " " + endTime + ":00"
}



