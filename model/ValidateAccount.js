const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

const writeToTerminal = require("./writeToTerminal")

module.exports = {
    ValidateAccount : function ValidateAccount(cardType, cardNumber){
        db.read()
        let validatedAccounts = []
        let allPlayers = db.get('players').value()

        switch(cardType){
            case "AccountNumber": {
                writeToTerminal("ValidateAccount: cardType = AccountNumber")
                allPlayers.forEach(player => {
                    if(player.accountNumber === cardNumber){
                        validatedAccounts.push(player)
                    }
                });
                break
                }
            case "PhoneNumber": {
                writeToTerminal("ValidateAccount: cardType = PhoneNumber")
                allPlayers.forEach(player => {
                    if(player.phoneNumber === cardNumber){
                        validatedAccounts.push(player)
                    }
                });
                break
                }
            case "CardNumber": {
                writeToTerminal("ValidateAccount: cardType = CardNumber")
                allPlayers.forEach(player => {
                    if(player.cardNumber === cardNumber){
                        validatedAccounts.push(player)
                    }
                });
                break
                }
            }

        let PatronResponse = []
        let oneAccountBlocked = false
        validatedAccounts.forEach(account => {
            //see if player is blocked
            let isBlocked = account.isInActive === "TRUE" || account.isPinLocked === "TRUE" || account.isBanned === "TRUE";
            if(isBlocked) {
                oneAccountBlocked = true
            }

            PatronResponse.push({
                ClubStateId: 40,//hardcoded for rn
                AccountNumber: account.accountNumber,
                FirstName: account.firstName,
                LastName: account.lastName, 
                ClubState: account.tierLevel,
                DateOfBirth: account.dateOfBirth,
                PointsBalance: parseInt(account.pointBalance),
                PointsBalanceInDollars: (account.pointBalance/db.get('pointsToDollars').value()).toFixed(2),
                CompBalance: parseInt(account.compBalance),
                Promo2Balance: account.promo2Balance,
                IsInActive: account.isInActive,
                IsPinLocked: account.isPinLocked,
                IsBanned: account.isBanned,
                ResponseResult: {
                    IsSuccess: !isBlocked,
                    ErrorMessage: isBlocked ? generateErrorMessage(account) : "",
                    ErrorCode: isBlocked ? "error" : ""
                }
            })
        });

        let ResponseStatus;
        if(validatedAccounts.length === 0){
            writeToTerminal("ValidateAccount: No accounts found")
            ResponseStatus = {
                IsSuccess: false,
                ErrorMessage: "No accounts found",
                ErrorCode: "error"
            }
        } else if (oneAccountBlocked){
            writeToTerminal("ValidateAccount: One of the collection failed, review the collection result")
            ResponseStatus = {
                IsSuccess: false,
                ErrorMessage: "One of the collection failed, review the collection result.",
                ErrorCode: "error"
            }
        } else {
            ResponseStatus = {
                IsSuccess: true,
                ErrorMessage: "",
                ErrorCode: ""
            }
        }

        return {
            PatronResponse,
            ResponseStatus
        }
    }
}

function generateErrorMessage(account){
    let outString = "Player with Account # " + account.accountNumber
    if(account.isInActive === "TRUE"){
        outString += " is inactive"
    } else if(account.isBanned === "TRUE"){
        outString += " has been banned"
    } else if(account.isPinLocked === "TRUE"){
        outString += " is pin locked"
    }
    return outString
}