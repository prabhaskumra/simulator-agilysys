const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)


let redeemOfferResultList = []
let transactionIdCount = db.get('transactionId').value()

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

                        transactionIdCount++;
                        db.set('transactionId', transactionIdCount).write()
                        redeemOfferResultList[j].TransactionId = transactionIdCount

                        let data = {
                            "IsSucess": true,
                            "ErrorMessage": "",
                            "ErrorCode": ""
                        }
                        redeemOfferResultList[j].ResponseStatus = data
                        writeTransactions(data, j, accountnumber)
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

            transactionIdCount++;
            db.set('transactionId', transactionIdCount).write()
            redeemOfferResultList[j].TransactionId = transactionIdCount

            let data = {
                "IsSucess": false,
                "ErrorMessage": "Cannot Find the Offer",
                "ErrorCode": "XXX"
            }
            redeemOfferResultList[j].ResponseStatus = data
            writeTransactions(data, j, accountnumber)
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

function writeTransactions(data, j, accountnumber){
    let transactionData = {
        "SequenceID": redeemOfferResultList[j].SequenceID,
        "ReferenceID": redeemOfferResultList[j].ReferenceID,
        "OfferCode": redeemOfferResultList[j].OfferCode,
        "TransactionId": transactionIdCount,
        "ResponseStatus":data
    }

    db.get('transactions')
        .push({
            type: "RedeemOffer",
            "AccountNumber": accountnumber,
            transactionId: transactionIdCount,
            transactionData
        })
        .write()
}