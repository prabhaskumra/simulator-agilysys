var playerData = db.get('players').value()
var newUser = {}

function addNewUser(){

    // newUser +=(
    //     "<div>"+
    //         "<form>"+
    //             "<label for='fname'>First Name</label>"+
    //             "<input type='input1' id='fname' name='firstname' placeholder='Your First Name..''> <br>"+

    //             "<label for='lname'>Last Name</label>"+
    //             "<input type='input1' id='lname' name='lastname' placeholder='Your Last Name..''> <br>"+

    //             "<label for='account-number'>Account Name</label>"+
    //             "<input type='input1' id='account-number' name='account-number' placeholder='Your Account Number..''> <br>"+

    //             "<label for='point-balance'>Point Balance</label>"+
    //             "<input type='input1' id='point-balance' name='point-balance' placeholder='Point Balance..''> <br>"+

    //             "<label for='comp-balance'>Comp Balance</label>"+
    //             "<input type='input1' id='comp-balance' name='comp-balance' placeholder='Comp Balance..''> <br>"+

    //             "<label for='promo-balance'>Promo2 Balance</label>"+
    //             "<input type='input1' id='promo-balance' name='promo-balance' placeholder='Promo Balance..''> <br>"+

    //             "<label for='start'>Date of Birth</label>"+
    //             "<input type='date' id='dob' name='dob' value='2019-07-22' min='1920-01-01' max='2020-01-01'> <br>"+

    //             "<label for='isactive'>Is Active</label>"+
    //             "<select id='isactive' name='isactive'>" +
    //                 "<option value='FALSE'>TRUE</option>"+
    //                 "<option value='FALSE'>FALSE</option>"+  
    //             "</select> <br>"+     

    //             "<label for='isbanned'>Is Banned</label>"+
    //             "<select id='isbanned' name='isbanned'>" +
    //                 "<option value='TRUE'>TRUE</option>"+
    //                 "<option value='FALSE'>FALSE</option>"+  
    //             "</select><br>"+ 

    //             "<label for='isPinLocked'>Is Pin Locked</label>"+
    //             "<select id='isPinLocked' name='isPinLocked'>" +
    //                 "<option value='TRUE'>TRUE</option>"+
    //                 "<option value='FALSE'>FALSE</option>"+  
    //             "</select> <br>"+

    //         "</form>"+
    //     "</div>"
    // )

    // document.getElementById('add-plyr').innerHTML = newUser
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
        "isInActive": "TRUE",
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
}

function enterData(inputElement){
    newUser.firstName = inputElement.value
}