const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

const writeToTerminal = require("./writeToTerminal")

module.exports = {
    BalanceInquiry : function BalanceInquiry(accountNumber){
        //db.read()

        

        // var foundAccount = undefined;
        // var playerData = db.get('players').value()
        // console.log(playerData)
        // for(let i = 0; i < playerData.length; i++)
        //     if(playerData[i].accountNumber === String(accountNumber)){
        //       foundAccount = playerData[i]
        //     }
                

        // if(foundAccount === undefined)
        //     return
        
        // console.log(foundAccount)

        return foundAccount
    }
}
