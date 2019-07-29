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
            let transactionId = toVoid.TransactionId 
            let transaction = transactions[parseInt(transactionId) - 1]
            let isSuccess = true

            switch(toVoid.RedemptionType){
                case "PointRedemption": {
                    let foundAccount = db.get('players')
                    .find({accountNumber: accountNumber})
                    .value()

                    if(transaction.type != "RedeemPoints"){
                        writeToTerminal("Error: Transaction type doesn't match")
                        isSuccess = false
                    } else if(transaction.isVoided){ // error sandwich lol me hungry
                        writeToTerminal("Error: Already voided")
                        isSuccess = false
                    } else if(transaction.transactionData.ResponseStatus.IsSuccess){
                        foundAccount.pointBalance += parseInt(transaction.transactionData.RedeemDollars * db.get('pointsToDollars').value())
                        writeToTerminal(`Voided back ${transaction.transactionData.RedeemDollars} points. New Balance is ${foundAccount.pointBalance}`)
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
                    if(transaction.type != "RedeemOffer"){
                        writeToTerminal("Error: Transaction type doesn't match")
                        isSuccess = false
                    } else if(transaction.isVoided){ // error sandwich lol me hungry
                        writeToTerminal("Error: Already voided")
                        isSuccess = false
                    } else if(transaction.transactionData.ResponseStatus.IsSuccess){
                        db.get('offers')
                        .push({
                            AccountNumber: transaction.transactionData.AccountNumber,
                            OfferCode: transaction.transactionData.OfferCode,
                            OfferName: transaction.transactionData.OfferName,
                            OfferValue: transaction.transactionData.OfferValue,
                            OfferStartDate: transaction.transactionData.OfferStartDate,
                            OfferEndDate: transaction.transactionData.OfferEndDate
                        })
                        .write()

                        writeToTerminal(`Voided back offer ${transaction.transactionData.OfferCode}. Added offer back to account.`)
                    } else {
                        writeToTerminal("Tried to void unsuccessful transaction", toVoid)
                        isSuccess = false
                    }

                    if(isSuccess)
                      setToVoid(transactionId)  

                    VoidAllResultList.push(addToResults(isSuccess, transactionId))
                    break;
                }
                case "RetailRating": {
                    if(transaction.type != "RetailRating"){
                        writeToTerminal("Error: Transaction type doesn't match")
                        isSuccess = false
                    } else if(transaction.isVoided){ // error sandwich lol me hungry
                        writeToTerminal("Error: Already voided")
                        isSuccess = false
                    } else { //retail rating will always be successful - no need to find isSuccess
                        let foundPlayer = db.get('players')
                        .find({accountNumber: String(accountNumber)})
                        .value()

                        //assign new point balance
                        db.get('players')
                        .find({accountNumber: String(accountNumber)})
                        .assign({pointBalance: parseInt(foundPlayer.pointBalance) - transaction.transactionData.EarnedPoints})
                        .write()
                    }

                    if(isSuccess)
                    setToVoid(transactionId)  

                    VoidAllResultList.push(addToResults(isSuccess, transactionId))
                    break;
                }
                case "CouponRedemption": {
                    if(transaction.type != "RedeemCoupon"){
                        writeToTerminal("Error: Transaction type doesn't match")
                        isSuccess = false
                    } else if(transaction.isVoided){ // error sandwich lol me hungry
                        writeToTerminal("Error: Already voided")
                        isSuccess = false
                    } else if(transaction.transactionData.ResponseStatus.IsSuccess){
                        let foundCoupon = db.get('coupons')
                        .find({CouponNumber: String(transaction.transactionData.CouponNumber)})
                        .value()

                        if(foundCoupon === undefined){ //did not find coupon
                            db.get('coupons').push({
                                CouponNumber: String(transaction.transactionData.CouponNumber),
                                Balance: String(transaction.transactionData.RedeemedAmount)
                            })
                            .write()

                            writeToTerminal(`Voided back coupon ${transaction.transactionData.CouponNumber}. Added coupon back to database.`)
                        } else {
                            db.get('coupons')
                            .find({CouponNumber: String(transaction.transactionData.CouponNumber)})
                            .assign({Balance: String(parseInt(foundCoupon.Balance) + transaction.transactionData.RedeemedAmount)})     
                            .write()

                            writeToTerminal(`Voided back ${transaction.transactionData.RedeemedAmount} points for coupon ${transaction.transactionData.CouponNumber}. New balance is ${foundCoupon.Balance}`)
                        }
                    } else {
                        writeToTerminal("Tried to void unsuccessful transaction", toVoid)
                        isSuccess = false
                    }

                    if(isSuccess)
                    setToVoid(transactionId)  

                    VoidAllResultList.push(addToResults(isSuccess, transactionId))
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
