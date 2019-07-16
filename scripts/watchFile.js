//checks to see if foundAccount.json has updated, meaning that there was a query and result was found
fs.watchFile(path.join('./transaction.json'), (curr, prev) => {
    let transaction = JSON.parse(fs.readFileSync(path.join('./transaction.json')), 'utf8')
    //display results onto electron window
    foundAccount = transaction.account
    transaction = transaction.transaction


    //------------------------------REDEEMCOMP -> THIS WILL ADD A STATEMENT OF NEW COMP BALANCE TO OUTPUTTED PLAYER DATA -----------------------------------------------//
    let accountInfo = ""
    if(transaction.model === "RedeemComp"){
        //find account - idk why i have to do this but it works no touch >;(
        accountInfo += "<h1>Redeemed " + transaction.redeemedAmount + " dollars<h1>"
        for(let i = 0; i < players.length; i++)
            if(players[i].accountNumber === String(transaction.accountNumber))
              foundAccount = players[i]
        accountInfo += "<h3>" + foundAccount.firstName + " " + foundAccount.lastName + " has a new comp balance of: " + transaction.compBalance + "</h3></br></br> "
    //-------------------------------REDEEMPOINTS -> BLAH BLAH SAME AS ABOVE-------------------------------------------------------------------------------------------//
    } else if(transaction.model === "RedeemPoints"){
        //find account - idk why i have to do this but it works no touch >;(
        accountInfo += "<h1>Redeemed " + transaction.redeemedAmount + " dollars<h1>"
        for(let i = 0; i < players.length; i++)
            if(players[i].accountNumber === String(transaction.accountNumber))
                foundAccount = players[i]
        accountInfo += "<h3>" + foundAccount.firstName + " " + foundAccount.lastName + " has a new points balance of: " + transaction.pointBalance + "</h3></br></br> "

    }

    let pointsToDollars = (foundAccount.pointBalance/db.get('pointsToDollars').value()).toFixed(2)

    //everything below this will generage the basic output for player data.
    accountInfo = (
        "<div class='row'>" + //shoulda used react huh r ip
            "<div class='col-lg-3 col-sm-6 col-6'><b>Name: </b>" + foundAccount.firstName + " " + foundAccount.lastName + "</div>" +
            "<div class='col-lg-3 col-sm-6 col-6'><b>Account Number: </b>" + foundAccount.accountNumber + "</div>" +
            "<div class='col-lg-3 col-sm-6 col-6'><b>Point Balance: </b>" + foundAccount.pointBalance + "</div>" +
            "<div class='col-lg-3 col-sm-6 col-6'><b>Points in Dollars: </b>$" + pointsToDollars + "</div>" +
            "<div class='col-lg-3 col-sm-6 col-6'><b>Comp Balance: </b>" + foundAccount.compBalance + "</div>" +
            "<div class='col-lg-3 col-sm-6 col-6'><b>Tier Level: </b>" + foundAccount.tierLevel + "</div>" +
            "<div class='col-lg-3 col-sm-6 col-6'><b>Date of Birth: </b>" + foundAccount.dateOfBirth + "</div>" +
            "<div class='col-lg-3 col-sm-6 col-6'><b>promo2balance: </b>" + foundAccount.promo2Balance + "</div>" +
            "<div class='col-lg-3 col-sm-6 col-6'><b>Banned: </b>" + foundAccount.isBanned + "</div>" +
            "<div class='col-lg-3 col-sm-6 col-6'><b>InActive: </b>" + foundAccount.isInActive + "</div>" +
            "<div class='col-lg-3 col-sm-6 col-6'><b>Pin Locked: </b>" + foundAccount.isPinLocked + "</div>" +
        "</div>"
    ) + accountInfo

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