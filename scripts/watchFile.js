//checks to see if foundAccount.json has updated, meaning that there was a query and result was found
fs.watchFile(path.join('./transaction.json'), (curr, prev) => {
    console.log('file changed')
    file = fs.readFileSync('./data.json')

    let transaction = JSON.parse(fs.readFileSync(path.join('./transaction.json')), 'utf8')
    //display results onto electron window
    let  foundAccount = transaction.account

    console.log('fuck')
    document.getElementById('player-data').innerHTML = (
        
        "<b> Account Number: </b>" + foundAccount.accountNumber + "</br>" +
        "<b> Name: </b>" + foundAccount.firstName + " " + foundAccount.lastName + "</br>" +
        "<b> Point Balance: </b>" + foundAccount.pointBalance + "</br>" +
        "<b> Tier Level: </b>" + foundAccount.tierLevel + "</br>"
    )
    

    let offerHTML = "<h1>Offers:</h1>"

    offerHTML += (
        "<table border='1' width='700'>" + 
        "<tr><th>Offer Code #</th><th>Offer Name</th><th>Offer Value</th><th>Offer Start Date</th><th>Offer End Date</th></tr>"
        )

    offers.forEach(offer => {
        if(offer.AccountNumber == foundAccount.accountNumber){
            offerHTML += (
            "<tr><td>" + offer.OfferCode + "</td>" +
            "<td>" + offer.OfferName + "</td>" +
            "<td>" + offer.OfferValue +"</td>" +
            "<td>" +  offer.OfferStartDate +"</td> "+
            "<td>" + offer.OfferEndDate +"</td></tr>")
        }
    });
    offerHTML += "</table>"
    

    console.log(offerHTML)
    document.getElementById('offer-data').innerHTML = offerHTML
    
    fs.truncate(path.join('./transaction.json'), 0, (err) => {
        if(err) throw err;
      })
})