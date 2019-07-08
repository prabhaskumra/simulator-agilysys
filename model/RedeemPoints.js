const fs = require('fs')
const path = require('path')

module.exports = {
    RedeemPoints : function RedeemPoints(accountNumber, redeemPointsList){
        let playerData = JSON.parse(fs.readFileSync(path.join(__dirname+'/../data/data.json')),'utf8')
        let foundAccount = undefined
        let i = 0;

        for(i = 0; i < playerData.length; i++)
            if(playerData[i].accountNumber === String(accountNumber))
                foundAccount = playerData[i]
        
        let currentPoints = parseInt(foundAccount.pointBalance)
        let outPointList = []
        let redeemedTotal = 0


        redeemPointsList.forEach(pointOffer => {
            currentPoints += parseInt(pointOffer.RedeemDollars)
            redeemedTotal += pointOffer.RedeemDollars
            outPointList.push({
                "SequenceID": pointOffer.SequenceID,
                "ReferenceID": pointOffer.ReferenceID,
                "RedeemDollars": pointOffer.RedeemDollars,
                "TransactionId": "who care lol",
                "ResponseStatus": {
                    "IsSuccess": true,
                    "ErrorMessage": "",
                    "ErrorCode": ""
                  }
            })               
        });

        foundAccount.pointBalance = currentPoints
        playerData[i] = foundAccount

        fs.writeFile(path.join('./data/data.json'), JSON.stringify(playerData), 'utf8', function(err){
            if(err) console.log(err); 
        })
        

        let out = {
            "AccountNumber": accountNumber,
            "PointsBalance": currentPoints,
            "PointsBalanceInDollars": currentPoints,
            "RedeemPointsList": outPointList,
            "ResponseStatus": {
                "IsSuccess": true,
                "ErrorMessage": "",
                "ErrorCode": ""
              },
              "CustomFields": {}
        }



        return { out, redeemedTotal }
    }
}
