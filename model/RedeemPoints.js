const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

const writeToTerminal = require("./writeToTerminal")

module.exports = {
    RedeemPoints : function RedeemPoints(accountNumber, redeemPointsList){
        db.read()
        let foundAccount = undefined
        let i = 0;

        foundAccount = db.get('players')
            .find({accountNumber: accountNumber})
            .value()
        
        let currentPoints = parseInt(foundAccount.pointBalance)
        let outPointList = []
        let redeemedTotal = 0


        redeemPointsList.forEach(pointOffer => {
            currentPoints -= parseInt(pointOffer.RedeemDollars)
            let isUnder0
            if(currentPoints >= 0) {
                redeemedTotal += pointOffer.RedeemDollars
                isUnder0 = false
            } else {
                isUnder0 = true
                writeToTerminal("RedeemPoints: Attempted to redeem more than available points")
            }
            currentPoints = foundAccount.pointBalance - redeemedTotal

            let transactionIdCount = db.get('transactionId').value()
            transactionIdCount++
            db.set('transactionId', transactionIdCount).write() //write back to db 

            let data = {
                "AccountNumber": accountNumber,
                "SequenceID": pointOffer.SequenceID,
                "ReferenceID": pointOffer.ReferenceID,
                "RedeemDollars": pointOffer.RedeemDollars,
                "TransactionId": transactionIdCount,
                "ResponseStatus": {
                    "IsSuccess": !isUnder0,
                    "ErrorMessage": !isUnder0 ? "" : "negative balance",
                    "ErrorCode": ""
                  }
            }

            db.get('transactions')
                .push({
                    type: "RedeemPoints",
                    transactionId: transactionIdCount,
                    transactionData: data
                })
                .write()

            outPointList.push(data)               
        });

        db.get('players')
        .find({accountNumber: String(accountNumber)})
        .assign({pointBalance: foundAccount.pointBalance - redeemedTotal})
        .write()

        let pointsToDollars = foundAccount.pointBalance/db.get('pointsToDollars').value()
        let redeemedPointsToDollars = (redeemedTotal/db.get('pointsToDollars').value()).toFixed(2)
        writeToTerminal(`RedeemPoints: Redemed ${redeemedTotal} points/${redeemedPointsToDollars} in dollars`)
        let out = {
            "AccountNumber": accountNumber,
            "PointsBalance": foundAccount.pointBalance,
            "PointsBalanceInDollars": pointsToDollars.toFixed(2),
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
