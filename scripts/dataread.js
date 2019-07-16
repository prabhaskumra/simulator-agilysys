const { ipcRenderer, remote } = require('electron')
const fs = require('fs')
const csv = require('csv-parser')
const path = require('path')

//database shit
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

var players = []
var offers = []

var appReady = false

//checks to see if data is loaded, if not, show message
function isAppReady(){
    let playerExists = false
    let offersExists = false

    if(db.get('players').size().value() != 0) {
        playerExists = true

    } else {
        console.log('player info missing')
        console.log(db.get('players').size().value())
    }

    if(db.get('offers').size().value() != 0) {
        offersExists = true 
    } else {
        console.log('player info missing')
        console.log(db.get('offers').size().value())

    }

    if(offersExists === true && playerExists === true){
        appReady = true
        ipcRenderer.send("isAppReady", true );//send this serverside
        document.getElementById('app-not-ready').style.display = "none"
    } else {
        document.getElementById('app-not-ready').style.display = "block"
    }
}

//there needs to be more logical shit here but we don't know the conditions so just leave this for now.

//opens window to select file to download mock data
function openPlayers(){
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
        console.log(fileName)
 
        csv(['firstName', 'lastName', 'accountNumber', 'tierLevel', 'dateOfBirth', 'pointBalance', 'compBalance', 'promo2Balance', 'isBanned', 'isInActive', 'isPinLocked'])
        fs.createReadStream(fileName[0])
        .pipe(csv())
        .on('data', (data) => {
            db.get('players')
            .push(data)
            .write()
        })
        .on('end' , () => {
            players = db.get('players').value()
            isAppReady()
        })
        document.getElementById("player-data-status").innerText = "Player Data ✔️"
        db.write()
    })
}

function openOffers(){
    csv(['AccountNumber', 'OfferCode', 'OfferName', 'OfferValue', 'OfferStartDate', 'OfferEndDate'])
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
        fs.createReadStream(fileName[0])
        .pipe(csv())
        .on('data', (data) => {
            db.get('offers')
            .push(data)
            .write()
        })
        .on('end' , () => {
            offers = db.get('offers').value()
            isAppReady()
        })
        document.getElementById("offer-data-status").innerText = "Offer Data ✔️"
        db.write()
    })

}


//checks to see if files were already uploaded and stored locally
function checkUploaded() {
    if (db.get('players').size().value() == 0) {
        document.getElementById('player-data-status').textContent = "Player Data ❌"
    } else {
        document.getElementById('player-data-status').textContent = "Player Data ✔️"
        players = db.get('players').value()
    }

    if (db.get('offers').size().value() == 0) {
        document.getElementById('offer-data-status').textContent = "Offer Data ❌"
    } else {
        document.getElementById('offer-data-status').textContent = "Offer Data ✔️"
        offers = db.get('offers').value()
    }
    isAppReady()
    //update points to dollars
    checkPointsToDollars()
}

function checkPointsToDollars(){
    let pointsToDollars = db.get('pointsToDollars').value()
    document.getElementById('pointsToDollars').textContent = pointsToDollars + " : 1"
    db.write()
}
