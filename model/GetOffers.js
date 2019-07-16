const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

module.exports = {
    GetOffers : function GetOffers(accountNumber){
        db.read()
        let offers = []

        //get offers associated to account
        var offerData = db.get('offers').value()
        for(let i = 0; i < offerData.length; i++)
            if(offerData[i].AccountNumber === String(accountNumber))
              offers.push(offerData[i])
        
        //reformat offer array
        for(let i = 0; i < offers.length; i++){
            delete offers[i].AccountNumber;
            offers[i].OfferValue = parseInt(offers[i].OfferValue)
        }

        let out = {
            "AccountNumber": accountNumber,
            Offers: offers,
            "ResponseStatus": {
                "IsSuccess": true,
                "ErrorMessage": "",
                "ErrorCode": ""
              },
              "CustomFields": {}
        }
        //return object expected by IG
        return out
    }
}