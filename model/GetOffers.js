const fs = require('fs')
const path = require('path')

module.exports = {
    GetOffers : function GetOffers(accountNumber){
        let offers = []

        //get offers associated to account
        var offerData = JSON.parse(fs.readFileSync(path.join(__dirname+'/../offers.json')),'utf8')
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