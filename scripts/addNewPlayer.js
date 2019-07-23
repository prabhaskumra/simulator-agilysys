var playerData = db.get('players').value()
var newUser = {}

function addNewUser(){

    newUser = {
        "firstName": "",
        "lastName": "",
        "accountNumber": "",
        "tierLevel": "1",
        "dateOfBirth": "",
        "pointBalance": "0",
        "compBalance": "0",
        "promo2Balance": "0",
        "isBanned": "FALSE",
        "isInActive": "FALSE",
        "isPinLocked": "FALSE"
      }
}

function newWindow(){
    document.getElementById('add-player').style.display = 'block'
    document.getElementById('edit-players').style.display = 'none'
    addNewUser()
}

function loadTable(){
    document.getElementById('add-player').style.display = 'none'
    document.getElementById('edit-players').style.display = 'block'
}

function saveForm(){
    playerData.push(newUser)
    db.set('players', playerData).write()
    updateTable()
}

function enterData(inputElement){

    switch(inputElement.name){
        case 'firstname': {
            newUser.firstName = inputElement.value
            break
        }
        case 'lastname': {
            newUser.lastName = inputElement.value
            break
        }
        case 'account-number': {
            newUser.accountNumber = inputElement.value
            break
        }
        case 'point-balance': {
            newUser.pointBalance = inputElement.value
            break
        }
        case 'tier-level': {
            newUser.tierLevel = inputElement.value
            break
        }
        case 'dob': {
            newUser.dateOfBirth = inputElement.value
            break
        }
        case 'comp-balance':{
            newUser.compBalance = inputElement.value
            break
        }
        case 'isInActive':{
            newUser.isInActive = inputElement.value
            break
        }
        case 'isbanned':{
            newUser.isBanned = inputElement.value
            break
        }
        case 'isPinLocked':{
            newUser.isPinLocked = inputElement.value
            break
        }
        case 'promo-balance':{
            newUser.promo2Balance = inputElement.value
        }
    }
}

