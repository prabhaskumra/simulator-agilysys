//checks to see if foundAccount.json has updated, meaning that there was a query and result was found
<<<<<<< HEAD
fs.watchFile(path.join('./data/transaction.json'), (curr, prev) => {
    console.log('file changed')
    file = fs.readFileSync('./data/data.json')

    let transaction = JSON.parse(fs.readFileSync(path.join('./data/transaction.json')), 'utf8')
=======
fs.watchFile(path.join('./transaction.json'), (curr, prev) => {
    console.log('file changed')
    file = fs.readFileSync('./data.json')

    let transaction = JSON.parse(fs.readFileSync(path.join('./transaction.json')), 'utf8')
>>>>>>> parent of 4d48eb5... made legit database
    //display results onto electron window
    foundAccount = transaction.account
    transaction = transaction.transaction


    //------------------------------REDEEMCOMP -> THIS WILL ADD A STATEMENT OF NEW COMP BALANCE TO OUTPUTTED PLAYER DATA -----------------------------------------------//
    let accountInfo = ""
    if(transaction.model === "RedeemComp"){
        //find account - idk why i have to do this but it works no touch >;(
<<<<<<< HEAD
        var playerData = JSON.parse(fs.readFileSync(path.join('./data/data.json')),'utf8')
=======
        var playerData = JSON.parse(fs.readFileSync(path.join('./data.json')),'utf8')
>>>>>>> parent of 4d48eb5... made legit database
        accountInfo += "<h1>Redeemed " + transaction.redeemedAmount + " dollars<h1>"
        for(let i = 0; i < playerData.length; i++)
            if(playerData[i].accountNumber === String(transaction.accountNumber))
              foundAccount = playerData[i]
        accountInfo += "<h3>" + foundAccount.firstName + " " + foundAccount.lastName + " has a new comp balance of: " + transaction.compBalance + "</h3></br></br> "
    //-------------------------------REDEEMPOINTS -> BLAH BLAH SAME AS ABOVE-------------------------------------------------------------------------------------------//
    } else if(transaction.model === "RedeemPoints"){
        //find account - idk why i have to do this but it works no touch >;(
<<<<<<< HEAD
        var playerData = JSON.parse(fs.readFileSync(path.join('./data/data.json')),'utf8')
=======
        var playerData = JSON.parse(fs.readFileSync(path.join('./data.json')),'utf8')
>>>>>>> parent of 4d48eb5... made legit database
        accountInfo += "<h1>Redeemed " + transaction.redeemedAmount + " dollars<h1>"
        for(let i = 0; i < playerData.length; i++)
            if(playerData[i].accountNumber === String(transaction.accountNumber))
                foundAccount = playerData[i]
        accountInfo += "<h3>" + foundAccount.firstName + " " + foundAccount.lastName + " has a new points balance of: " + transaction.pointBalance + "</h3></br></br> "

    }







    //everything below this will generage the basic output for player data.
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