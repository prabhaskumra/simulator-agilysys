var oldPlayerData = db.get('players').value()
var newUser = {}
var flags = {}

// creates a new user object and with their check flags
function addNewUser(){

    oldPlayerData = db.get('players').value()
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

    flags ={
        "firstName": false,
        "lastName": false,
        "accountNumber": false,
        "tierLevel": false,
        "dateOfBirth": false,
        "pointBalance": false,
        "compBalance": false,
        "promo2Balance": false,
    }

}

// opens new window to add a new player form
function newWindow(){
    document.getElementById('add-player').style.display = 'block'
    document.getElementById('edit-players').style.display = 'none'
    addNewUser()
    document.getElementById("save-plyr-button").disabled = true
}

// load the window back with the edit player table
function loadTable(){
    document.getElementById('add-player').style.display = 'none'
    document.getElementById('edit-players').style.display = 'block'
}

// saves the new player to the database, disables the save button and reset the new player form
function saveForm(){
    oldPlayerData.push(newUser)
    db.set('players', oldPlayerData).write()
    updateTable()
    addNewUser()
    checkFlag()
    
    document.getElementById('save-plyr').textContent = "New Player Added Successfully!";

    setTimeout(function(){
        document.getElementById('save-plyr').textContent = "";
    },3000);

    document.getElementById("plyr-form").reset();
    document.getElementById("player-data-status").innerText = "Player Data ✔️"
    isAppReady()
}


// updates the values while they change in the new player form 
function enterData(inputElement){

    switch(inputElement.name){
        case 'firstname': {
            newUser.firstName = inputElement.value
        
            // checks if the value is an empty string
            if(/\S/.test(newUser.firstName))
                flags.firstName = true
            else
                flags.firstName = false

            checkFlag()
            break
        }
        case 'lastname': {
            newUser.lastName = inputElement.value

            if(/\S/.test(newUser.lastName))
                flags.lastName = true
            else
                flags.lastName = false

            checkFlag()
            break
        }
        case 'account-number': {
            newUser.accountNumber = inputElement.value

            if(/\S/.test(newUser.accountNumber))
                flags.accountNumber = true
            else
                flags.accountNumber = false
                
            checkFlag()
            break
        }
        case 'point-balance': {
            newUser.pointBalance = inputElement.value

            if(/\S/.test(newUser.pointBalance))
                flags.pointBalance = true
            else
                flags.pointBalance = false

            checkFlag()
            break
        }
        case 'tier-level': {
            newUser.tierLevel = inputElement.value

            if(/\S/.test(newUser.tierLevel))
                flags.tierLevel = true
            else
                flags.tierLevel = false

            checkFlag()
            break
        }
        case 'dob': {

            if(/\S/.test(inputElement.value))
                flags.dateOfBirth = true
            else
                flags.dateOfBirth = false

            var str = inputElement.value.split("-")
            newUser.dateOfBirth = str[1] + "/" + str[2] + "/" + str[0]

            checkFlag()
            break
        }
        case 'comp-balance':{
            newUser.compBalance = inputElement.value

            if(/\S/.test(newUser.compBalance))
                flags.compBalance = true
            else
                flags.compBalance = false

            checkFlag()
            break
        }
        case 'promo-balance':{
            newUser.promo2Balance = inputElement.value

            if(/\S/.test(newUser.promo2Balance))
                flags.promo2Balance = true
            else
                flags.promo2Balance = false

            checkFlag()
            break
        }
        case 'isInActive':{
            newUser.isInActive = inputElement.value
            checkFlag()
            break
        }
        case 'isbanned':{
            newUser.isBanned = inputElement.value
            checkFlag()
            break
        }
        case 'isPinLocked':{
            newUser.isPinLocked = inputElement.value
            checkFlag()
            break
        }
    }
}

// check if all the form fields have been changed from the default
function checkFlag(){
    if(flags.pointBalance && flags.firstName && flags.lastName && flags.accountNumber && flags.compBalance && 
        flags.tierLevel && flags.promo2Balance && flags.dateOfBirth)
            document.getElementById("save-plyr-button").disabled = false
    else
        document.getElementById("save-plyr-button").disabled = true
    
}


