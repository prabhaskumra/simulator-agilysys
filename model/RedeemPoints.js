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
        
        if(foundAccount === undefined){
            writeToTerminal(`Error: Player ${accountNumber} not found`)
            return {
                //return proper error here
                error: "error"
            }
        }
        let currentPoints = parseInt(foundAccount.pointBalance)
        let outPointList = []
        let redeemedTotal = 0


        redeemPointsList.forEach(pointOffer => {
            let pointsFromRedeemDollars = parseInt(parseFloat(pointOffer.RedeemDollars) * db.get('pointsToDollars').value())
            currentPoints -= pointsFromRedeemDollars
            let isUnder0
            if(currentPoints >= 0) {
                redeemedTotal += pointsFromRedeemDollars
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
                    isVoided: false,
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
        writeToTerminal(`RedeemPoints: Old balance (${parseInt(foundAccount.pointBalance + redeemedTotal)}) is now ${parseInt(foundAccount.pointBalance)}`)

        let out = {
            "AccountNumber": accountNumber,
            "PointsBalance": parseInt(foundAccount.pointBalance),
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
