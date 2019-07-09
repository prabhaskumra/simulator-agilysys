const fs = require('fs')
const path = require('path')

module.exports = {
    GetOffers : function GetOffers(accountNumber){
        let offers = []

        //get offers associated to account
<<<<<<< HEAD
        var offerData = JSON.parse(fs.readFileSync(path.join(__dirname+'/../data/offers.json')),'utf8')
=======
        var offerData = JSON.parse(fs.readFileSync(path.join(__dirname+'/../offers.json')),'utf8')
>>>>>>> parent of 4d48eb5... made legit database
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