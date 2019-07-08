//checks to see if foundAccount.json has updated, meaning that there was a query and result was found
fs.watchFile(path.join('./transaction.json'), (curr, prev) => {
    console.log('file changed')
    file = fs.readFileSync('./data.json')

    let transaction = JSON.parse(fs.readFileSync(path.join('./transaction.json')), 'utf8')
    //display results onto electron window
    foundAccount = transaction.account
    transaction = transaction.transaction

    let accountInfo
    if(transaction.model === "RedeemComp"){
        accountInfo = foundAccount.firstName + " " + foundAccount.lastName + " new balance is " + transaction.compBalance
    }

    accountInfo += (
        "<b> Account Number: </b>" + foundAccount.accountNumber + "</br>" +
        "<b> Name: </b>" + foundAccount.firstName + " " + foundAccount.lastName + "</br>" +
        "<b> Point Balance: </b>" + foundAccount.pointBalance + "</br>" +
        "<b> Tier Level: </b>" + foundAccount.tierLevel + "</br>"
    )

    document.getElementById('player-data').innerHTML = accountInfo
    

    let offerHTML = "<h1>Offers:</h1>"

    offerHTML += (
        "<table border='1' width='700'>" + 
        "<tr><th>Offer Code #</th><th>Offer Name</th><th>Offer Value</th><th>Offer Start Date</th><th>Offer End Date</th></tr>"
        "<tr><th>Add </th><th> Offer Code #</th><th>Offer Name</th><th>Offer Value</th><th>Offer Start Date</th><th>Offer End Date</th></tr>"
        )

    var buttonID=0
    offers.forEach(offer => {
        if(offer.AccountNumber == foundAccount.accountNumber){
            offerHTML += (
            "<tr><td>" + offer.OfferCode + "</td>" +
            "<tr><td><button id=addOffer" + buttonID + "' class='button button3' onclick='addOffers(this.id)'>Add</button> </td>" +
            "<td>" + offer.OfferCode + "</td>" +
            "<td>" + offer.OfferName + "</td>" +
            "<td>" + offer.OfferValue +"</td>" +
            "<td>" +  offer.OfferStartDate +"</td> "+
            "<td>" + offer.OfferEndDate +"</td></tr>")
            buttonID++;
        }
    });
    offerHTML += "</table>"
    

    console.log(offerHTML)
    document.getElementById('offer-data').innerHTML = offerHTML
    
    fs.truncate(path.join('./transaction.json'), 0, (err) => {
        if(err) throw err;
      })
})