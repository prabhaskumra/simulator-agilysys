const fs = require('fs')
const path = require('path')
module.exports = {
    validateUser : function validateUser(accountNumber){
        var playerData = JSON.parse(fs.readFileSync(path.join(__dirname+'/../data.json')),'utf8')
        for(let i = 0; i < playerData.length; i++)
            if(playerData[i].accountNumber === String(accountNumber))
                return playerData[i]
    }
}
