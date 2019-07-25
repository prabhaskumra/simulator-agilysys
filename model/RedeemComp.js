const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

const writeToTerminal = require("./writeToTerminal")

module.exports = {
    RedeemComp : function RedeemComp(accountNumber, compList){
        db.read()
        let foundAccount = undefined
        let i = 0;

        foundAccount = db.get('players')
            .find({accountNumber: accountNumber})
            .value()

        if(foundAccount === undefined){
            return {
                AccountNumber: accountNumber,
                CompBalance: 0,
                ResponseStatus: {
                    IsSuccess: false,
                    ErrorMessage: "",
                    ErrorCode: ""
                }
            }
        }
        
        let currentCompPoints = parseInt(foundAccount.compBalance)
        let outCompList = []
        let redeemedTotal = 0

        compList.forEach(comp => {
            currentCompPoints -= parseInt(comp.RedeemDollars)
            let isUnder0
            if(currentCompPoints >= 0) {
                redeemedTotal += comp.RedeemDollars
                isUnder0 = false
            } else {
                isUnder0 = true
            }
            currentCompPoints = foundAccount.compBalance - redeemedTotal
            writeToTerminal(`RedeemComp: Redeemed ${redeemedTotal} points`)
            writeToTerminal(`RedeemComp: Old balance (${foundAccount.compBalance}) is now ${parseInt(currentCompPoints)}`)

            let transactionIdCount = db.get('transactionId').value()
            transactionIdCount++
            db.set('transactionId', transactionIdCount).write() //write back to db               

            let data = {     
                AccountNumber: accountNumber,
                "SequenceID": comp.SequenceID,
                "ReferenceID": comp.ReferenceID,
                "RedeemDollars": comp.RedeemDollars,
                "TransactionId": transactionIdCount,
                "ResponseStatus": {
                    "IsSuccess": !isUnder0,
                    "ErrorMessage": !isUnder0 ? "" : "negative balance",
                    "ErrorCode": ""
                    }
            }

            db.get('transactions')
                .push({
                    type: "RedeemComp",
                    transactionId: transactionIdCount,
                    isVoided: false,
                    data
                })
                .write()
            outCompList.push(data)
        });


        db.get('players')
            .find({accountNumber: String(accountNumber)})
            .assign({compBalance: parseInt(foundAccount.compBalance - redeemedTotal)})
            .write()

        let out = {
            "AccountNumber": accountNumber,
            "CompBalance": parseInt(foundAccount.compBalance),
            "RedeemCompList": outCompList,
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