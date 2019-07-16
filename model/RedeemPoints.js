const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

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
            }
            currentPoints = foundAccount.pointBalance - redeemedTotal

            let transactionIdCount = db.get('transactionId').value()
            transactionIdCount++
            db.set('transactionId', transactionIdCount).write() //write back to db 

            let data = {
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
                    data
                })
                .write()

            outPointList.push(data)               
        });

        db.get('players')
        .find({accountNumber: String(accountNumber)})
        .assign({pointBalance: foundAccount.pointBalance - redeemedTotal})
        .write()
        
        let pointsToDollars = db.get('pointsToDollars').value()/foundAccount.pointBalance
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
