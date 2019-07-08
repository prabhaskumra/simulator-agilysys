const fs = require('fs')
const path = require('path')

module.exports = {
    RedeemComp : function RedeemComp(accountNumber, compList){
        let playerData = JSON.parse(fs.readFileSync(path.join(__dirname+'/../data/data.json')),'utf8')
        let foundAccount = undefined
        let i = 0;

        for(i = 0; i < playerData.length; i++)
            if(playerData[i].accountNumber === String(accountNumber))
                foundAccount = playerData[i]
        
        let currentCompPoints = parseInt(foundAccount.compBalance)
        let outCompList = []
        let redeemedTotal = 0



        compList.forEach(comp => {
            currentCompPoints += parseInt(comp.RedeemDollars)
            redeemedTotal += comp.RedeemDollars
            outCompList.push({
                "SequenceID": comp.SequenceID,
                "ReferenceID": comp.ReferenceID,
                "RedeemDollars": comp.RedeemDollars,
                "TransactionId": "who care lol",
                "ResponseStatus": {
                    "IsSuccess": true,
                    "ErrorMessage": "",
                    "ErrorCode": ""
                  }
            })               
        });

        foundAccount.compBalance = currentCompPoints
        playerData[i] = foundAccount

        fs.writeFile(path.join('./data/data.json'), JSON.stringify(playerData), 'utf8', function(err){
            if(err) console.log(err); 
        })
        

        let out = {
            "AccountNumber": accountNumber,
            "CompBalance": currentCompPoints,
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