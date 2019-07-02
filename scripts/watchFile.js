//checks to see if transaction.json has updated, meaning that there was a query and result was found
fs.watchFile(path.join('./transaction.json'), (curr, prev) => {
    console.log('file changed')
    file = fs.readFileSync('./data.json')

    let transaction = JSON.parse(fs.readFileSync(path.join('./transaction.json')), 'utf8')
    //display results onto electron window
    foundAccount = transaction.account

    document.getElementById('player-data').innerHTML = (
        "<b> Account Number: </b>" + foundAccount.accountNumber + "</br>" +
        "<b> Name: </b>" + foundAccount.firstName + " " + foundAccount.lastName + "</br>" +
        "<b> Point Balance: </b>" + foundAccount.pointBalance + "</br>" +
        "<b> Tier Level: </b>" + foundAccount.tierLevel + "</br>"
    )
    

    let offerHTML = "<h1>Offers:</h1>"
    offers.forEach(offer => {
        if(offer.AccountNumber == foundAccount.accountNumber){
            offerHTML += (
                "<div>" +
                    "<p>" + offer.OfferCode + "</p>" +
                    "<p>" + offer.OfferName + "</p>" +
                    "<p>" + offer.OfferValue + "</p>" +
                    "<p>" + offer.OfferStartDate + "</p>" +
                    "<p>" + offer.OfferEndDate + "</p>" +
                "</div></br></br>"
            )
        }
    });
    console.log(offerHTML)
    document.getElementById('offer-data').innerHTML = offerHTML
    
    fs.truncate(path.join('./transaction.json'), 0, (err) => {
        if(err) throw err;
      })
})