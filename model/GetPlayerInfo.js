const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

const writeToTerminal = require("./writeToTerminal")

module.exports = {
    getPlayerInfo : function getPlayerInfo(accountNumber){
        db.read()
        var foundAccount = undefined;
        var playerData = db.get('players').value()
        console.log(playerData)
        for(let i = 0; i < playerData.length; i++)
            if(playerData[i].accountNumber === String(accountNumber)){
              foundAccount = playerData[i]
            }
                

        if(foundAccount === undefined)
            return
        
        console.log(foundAccount)

        // let out = {
        //     PatronResponse: {
        //         ClubStateId: "not used",
        //         AccountNumber: foundAccount.accountNumber,
        //         FirstName: foundAccount.firstName,
        //         LastName: foundAccount.lastName,
        //         ClubState: foundAccount.tierLevel,
        //         DateOfBirth: foundAccount.dateOfBirth,
        //         PointsBalance: parseInt(foundAccount.pointBalance),
        //         PointsBalanceInDollars: parseInt(foundAccount.pointBalance), //TO-DO: CONVERT TO DOLLARS BASED ON INPUT
        //         CompBalance: parseInt(foundAccount.compBalance),
        //         Promo2Balance: parseInt(foundAccount.promo2Balance),
        //         IsInActive: foundAccount.isInActive, //TO-DO: I might have to get rid of the quotations out of these booleans
        //         IsPinLocked: foundAccount.isPinLocked,
        //         IsBanned: foundAccount.isBanned,
        //         ResponseResult: {
        //             IsSucesss: true, // <-- on what terms is this false
        //             ErrorMessage: "",
        //             ErrorCode: ""
        //         }  
        //     }, 
        //     "PatronDetail": {
        //         "patronaddress": [
        //           {
        //             "Address1": "Test Address1",
        //             "Address2": "sample string 1",
        //             "City": "Alpharetta",
        //             "State": "GA",
        //             "PostalCode": "30004",
        //             "Country": "USA",
        //             "ContactType": "1"
        //           },
        //           {
        //             "Address1": "Test Address1",
        //             "Address2": "sample string 2",
        //             "City": "Alpharetta",
        //             "State": "GA",
        //             "PostalCode": "30004",
        //             "Country": "USA",
        //             "ContactType": "2"
        //           }
        //         ],
        //         "patronemail": [
        //           {
        //             "Email": "abc@abc.com",
        //             "IsEmailSend": true,
        //             "ContactType": "1"
        //           },
        //           {
        //             "Email": "abc123@test.com",
        //             "IsEmailSend": false,
        //             "ContactType": "2"
        //           }
        //         ],
        //         "patronphone": [
        //           {
        //             "PhoneNumber": "7121238080",
        //             "Extension": "",
        //             "IsCall": true,
        //             "IsSendTextMessage": true,
        //             "ContactType": "1"
        //           },
        //           {
        //             "PhoneNumber": "80805678890",
        //             "Extension": "",
        //             "IsCall": false,
        //             "IsSendTextMessage": false,
        //             "ContactType": "2"
        //           }
        //         ],
        //         "VIP": true,
        //         "CasinoId": 1,
        //         "CasinoCode": "TDC",
        //         "Gender": "Male",
        //         "ResponseResult": {
        //           "IsSuccess": false,
        //           "ErrorMessage": "",
        //           "ErrorCode": ""
        //         },
        //         "PatronAddress": [
        //           {
        //             "Address1": "Test Address1",
        //             "Address2": "sample string 1",
        //             "City": "Alpharetta",
        //             "State": "GA",
        //             "PostalCode": "30004",
        //             "Country": "USA",
        //             "ContactType": "1"
        //           },
        //           {
        //             "Address1": "Test Address1",
        //             "Address2": "sample string 2",
        //             "City": "Alpharetta",
        //             "State": "GA",
        //             "PostalCode": "30004",
        //             "Country": "USA",
        //             "ContactType": "2"
        //           }
        //         ],
        //         "PatronEmail": [
        //           {
        //             "Email": "abc@abc.com",
        //             "IsEmailSend": true,
        //             "ContactType": "1"
        //           },
        //           {
        //             "Email": "abc123@test.com",
        //             "IsEmailSend": false,
        //             "ContactType": "2"
        //           }
        //         ],
        //         "PatronPhone": [
        //           {
        //             "PhoneNumber": "7121238080",
        //             "Extension": "",
        //             "IsCall": true,
        //             "IsSendTextMessage": true,
        //             "ContactType": "1"
        //           },
        //           {
        //             "PhoneNumber": "80805678890",
        //             "Extension": "",
        //             "IsCall": false,
        //             "IsSendTextMessage": false,
        //             "ContactType": "2"
        //           }
        //         ]
        //       },
        //       "ResponseStatus": {
        //         "IsSuccess": true,
        //         "ErrorMessage": "",
        //         "ErrorCode": ""
        //       },
        //       "CustomFields": {}
        // }
        return foundAccount
    }
}
