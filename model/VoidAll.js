const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

const writeToTerminal = require("./writeToTerminal")

module.exports = {
    VoidAll : function VoidAll(accountNumber, voidAllList){
        db.read()
        var transactions = db.get('transactions').value()
        let VoidAllResultList = []
        let noErrors = true

        voidAllList.forEach(toVoid => {            
            switch(toVoid.RedemptionType){
                case "PointRedemption": {
                    let transactionId = toVoid.TransactionId 
                    let transaction = transactions[parseInt(transactionId) - 1]
                    let isSuccess = true

                    let foundAccount = db.get('players')
                    .find({accountNumber: accountNumber})
                    .value()

                    if(transaction.type != "RedeemPoints"){
                        writeToTerminal("shit don't match")
                        isSuccess = false
                    }

                    if(transaction.isVoided){ // error sandwich lol me hungry
                        writeToTerminal("Error: Already voided")
                        isSuccess = false
                    } else if(transaction.transactionData.ResponseStatus.IsSuccess){
                        foundAccount.pointBalance += transaction.transactionData.RedeemDollars
                        writeToTerminal(`Voided back ${transaction.transactionData.RedeemDollars}. New Balance is ${foundAccount.pointBalance}`)
                    } else {
                        writeToTerminal("Tried to void unsuccessful transaction", toVoid)
                        isSuccess = false
                    }

                    db.get('players')
                    .find({accountNumber: String(accountNumber)})
                    .assign({pointBalance: foundAccount.pointBalance})
                    .write()

                    if(isSuccess)
                      setToVoid(transactionId)  

                    VoidAllResultList.push(addToResults(isSuccess, transactionId))
                    break;
                }
                case "OfferRedemption": {
                    break;
                }
                case "RetailRaiting": {
                    break;
                }
                case "CouponRedemption": {
                    break;
                }
                default: {
                    //should not be here
                }
            }
        });
        return {
            AccountNumber: accountNumber,
            VoidAllResultList,
            ResponseStatus: {
                IsSuccess: noErrors,
                ErrorMessage: "",
                ErrorCode: ""
            }
        }
    }
}

function addToResults(IsSuccess, TransactionId){
    if(!IsSuccess)
        noErrors = false 
    return {
        ReferenceId: "string",
        SequenceId: 1,
        TransactionId,
        ResponseStatus: {
            IsSuccess,
            ErrorMessage: "",
            ErrorCode: ""
        }
    }
}

function setToVoid(transactionId){
    db.get('transactions')
    .find({transactionId: parseInt(transactionId)})
    .assign({isVoided: true})
    .write()

    writeToTerminal(`Voided transaction ${parseInt(transactionId)}`)
}
