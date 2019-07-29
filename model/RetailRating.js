const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

const writeToTerminal = require("./writeToTerminal")

module.exports = {
    RetailRating : function RetailRating(accountNumber, amount){
        db.read()
        let retailRating = parseInt(db.get('retailRating').value())
        let redeemValue = parseInt(retailRating * amount);

        //we gotta read and then write this way - json limitation
        let foundPlayer = db.get('players')
        .find({accountNumber: String(accountNumber)})
        .value()

        //assign new point balance
        db.get('players')
        .find({accountNumber: String(accountNumber)})
        .assign({pointBalance: parseInt(foundPlayer.pointBalance) + redeemValue})
        .write()

        //write transaction
        let transactionIdCount = db.get('transactionId').value()
        transactionIdCount++
        db.set('transactionId', transactionIdCount).write() //write back to db 

        db.get('transactions')
        .push({
            type: "RetailRating",
            transactionId: transactionIdCount,
            isVoided: false,
            transactionData: {
                AccountNumber: accountNumber,
                EarnedPoints: redeemValue
            }
        })
        .write()

        writeToTerminal(`RetailRating: Earned ${redeemValue}, total points - ${foundPlayer.pointBalance}`)
        return {
            AccountNumber: accountNumber,
            TransactionId: transactionIdCount,
            ReferenceId: "string",
            ResponseStatus: {
                IsSuccess: true,
                ErrorMessage: "Success",
                ErrorCode: ""
            }
        }
    }
}