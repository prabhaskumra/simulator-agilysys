const { remote } = require('electron')
const fs = require('fs')
const csv = require('csv-parser')
const path = require('path')
var align = require('align-text');

var players = []
var offers = []

var playerFileName = ""
var offerFileName = ""

//there needs to be more logical shit here but we don't know the conditions so just leave this for now.

//opens window to select file to download mock data
function openFile(type){
    let dialog = remote.dialog
    dialog.showOpenDialog({
        title: 'Open Mock Data',
        filters: [
            {name: 'csv', extensions: ['csv']}
        ]
    }, (fileName) => {
        if(fileName === undefined){
            return;
        } 

        if(type === "player-data"){
            playerFileName = fileName[0]
            document.getElementById("player-data-status").innerText = "Player Data ✔️"
        } else if (type === "offer-data"){
            offerFileName = fileName[0]
            document.getElementById("offer-data-status").innerText = "Offer Data ✔️"
        }

        if(playerFileName != "" && offerFileName != ""){
            //read in player file
            csv(['firstName', 'lastName', 'accountNumber', 'tierLevel', 'pointBalance', 'compBalance', 'promo2Balance', 'isBanned', 'isInActive', 'isPinLocked'])

            fs.createReadStream(playerFileName)
            .pipe(csv())
            .on('data', (data) => {
                players.push(data)
            })
            .on('end' , () => {
                fs.writeFile(path.join('./data.json'), JSON.stringify(players), 'utf8', function(err){
                    if(err) console.log(err); 
                })
            })

            //read in offer file
            csv(['AccountNumber', 'OfferCode', 'OfferName', 'OfferValue', 'OfferStartDate', 'OfferEndDate'])

            fs.createReadStream(offerFileName)
            .pipe(csv())
            .on('data', (data) => {
                offers.push(data)
            })
            .on('end' , () => {
                fs.writeFile(path.join('./offers.json'), JSON.stringify(offers), 'utf8', function(err){
                    if(err) console.log(err); 
                })
            })

            
        }

    })
}


//read in mock data and seperate into objects and then into an array and then write it to data.json
function parseCSVData(file, type) {
    switch(type){
        case 'player-data':
            csv(['firstName', 'lastName', 'accountNumber', 'tierLevel', 'pointBalance', 'compBalance', 'promo2Balance', 'isBanned', 'isInActive', 'isPinLocked'])
            break
        case 'offer-data':
            csv(['AccountNumber', 'OfferCode', 'OfferName', 'OfferValue', 'OfferStartDate', 'OfferEndDate'])
            break
    }

    let dataArray

     fs.createReadStream(file)
        .pipe(csv())
        .on('data', (data) => {
            dataArray.push(data)
        })
        .on('end' , () => {
            switch(type){
                case 'player-data':
                    players = dataArray
                    fs.writeFile(path.join('./data.json'), JSON.stringify(players), 'utf8', function(err){
                        if(err){ 
                                console.log(err); 
                        } else {
                        }})
                    break
                case 'offer-data':
                    console.log(' in here')
                    offers = dataArray
                    fs.writeFile(path.join('./offers.json'), JSON.stringify(offers), 'utf8', function(err){
                        if(err){ 
                                console.log(err); 
                        } else {
                        }})
                    break
            }
        })
        console.log(type)
        console.log(offers)
        console.log(players)
        console.log(dataArray)
}

//checks to see if foundAccount.json has updated, meaning that there was a query and result was found
fs.watchFile(path.join('./foundAccount.json'), (curr, prev) => {
    console.log('file changed')
    file = fs.readFileSync('./data.json')

    let foundAccount = JSON.parse(fs.readFileSync(path.join('./foundAccount.json')), 'utf8')
    console.log(foundAccount)
    //display results onto electron window
    //align("Account Number", centerAlign);

    document.getElementById('player-data').innerHTML = (
        "<b> Account Number: </b>" + foundAccount.accountNumber + "</br>" +
        "<b> Name: </b>" + foundAccount.firstName + " " + foundAccount.lastName + "</br>" +
        "<b> Point Balance: </b>" + foundAccount.pointBalance + "</br>" +
        "<b> Tier Level: </b>" + foundAccount.tierLevel + "</br>"
    )
    fs.truncate(path.join('./foundAccount.json'), 0, (err) => {
        if(err) throw err;
      })
})

//checks to see if files were already uploaded and stored locally
function checkUploaded() {
    console.log('here')
    fs.access(path.join('./data.json'), fs.constants.F_OK, (err) => {
        if (err) {
            document.getElementById('player-data-status').textContent = "Player Data ❌"
        } else {
            document.getElementById('player-data-status').textContent = "Player Data ✔️"
        }
    })

    fs.access(path.join('./offers.json'), fs.constants.F_OK, (err) => {
        if (err) {
            document.getElementById('offer-data-status').textContent = "Offer Data ❌"
        } else {
            document.getElementById('offer-data-status').textContent = "Offer Data ✔️"
        }
    })
}