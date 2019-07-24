const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)


let redeemOfferResultList = []

const writeToTerminal = require("./writeToTerminal")

module.exports = {
    RedeemOffer: function RedeemOffer(offersAvailable, accountnumber){
        db.read()
        let offerData = []
        offerData = db.get('offers').value()
        
        redeemOfferResultList = []
        var j = 0  // index for the offersAvailable array

        while(j < offersAvailable.length){
            for(let i = 0; i < offerData.length; i++){
                if(offerData[i].AccountNumber === String(accountnumber)){
                    if(offerData[i].OfferCode === offersAvailable[j].OfferCode){
                        redeemOfferResultList.push(offersAvailable[j])
                        offerData.splice(i,1)
                        db.set('offers', offerData).write()
                        
                        let transactionIdCount = db.get('transactionId').value()
                        transactionIdCount++;
                        db.set('transactionId', transactionIdCount).write()
                       
                        redeemOfferResultList[j].TransactionId = transactionIdCount
                        writeToTerminal(`Successful transaction - Offer ${offerData[i].OfferCode}`)
                        let data = {
                            "IsSuccess": true,
                            "ErrorMessage": "",
                            "ErrorCode": ""
                        }
                        redeemOfferResultList[j].ResponseStatus = data
                        writeTransactions(data, j, accountnumber, transactionIdCount)
                        j++
                        i = 0
                    }
                }
                if(offersAvailable.length === j)
                    break
            }
            if(offersAvailable.length === j)
                break   

            redeemOfferResultList.push(offersAvailable[j])

            let transactionIdCount = db.get('transactionId').value()
            transactionIdCount++;
            db.set('transactionId', transactionIdCount).write()
            redeemOfferResultList[j].TransactionId = transactionIdCount
            
            let data = {
                "IsSuccess": false,
                "ErrorMessage": "Cannot Find the Offer",
                "ErrorCode": "XXX"
            }
            redeemOfferResultList[j].ResponseStatus = data
            writeTransactions(data, j, accountnumber, transactionIdCount)
            j++
        }

        let out = {
            "AccountNumber": accountnumber,
            RedeemOfferResultList: redeemOfferResultList,
            "ResponseStatus": {
                "IsSuccess": true,
                "ErrorMessage": "",
                "ErrorCode": ""
              },
              "CustomFields": {}
        }

        return out;

    }
}

function writeTransactions(data, j, accountnumber, transId){
    let transactionData = {
        "AccountNumber": accountnumber,
        "OfferCode": redeemOfferResultList[j].OfferCode,
        "OfferRedeemDollar": redeemOfferResultList[j].OfferRedeemDollar,
        "ResponseStatus": data
    }

    db.get('transactions')
        .push({
            type: "RedeemOffer",
            transactionId: transId,
            transactionData
        })
        .write()
}