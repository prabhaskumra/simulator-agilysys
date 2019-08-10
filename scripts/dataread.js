//******************************************************************************** */
var isProduction = true // set this to true when exporting to exe
//this simply just changes the path to use based on production or dev
/********************************************************************************* */

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
var coupons = []

//opens window to select file to download mock data
function openPlayers(){
    let dialog = remote.dialog
    dialog.showOpenDialog({
        title: 'Open Player Data',
        filters: [
            {name: 'csv', extensions: ['csv']}
        ]
    }, (fileName) => {
        if(fileName === undefined){
            return;
        } 
        players = []
        csv(['firstName', 'lastName', 'accountNumber', 'phoneNumber', 'cardNumber', 'tierLevel', 'dateOfBirth', 'pointBalance', 'compBalance', 'promo2Balance', 'isBanned', 'isInActive', 'isPinLocked'])
        fs.createReadStream(fileName[0])
        .pipe(csv())
        .on('data', (data) => {
            players.push(data)
        })
        .on('end' , () => {
            db.set('players', players).write()
        })
        document.getElementById("player-data-status").innerText = "Player Data ✔️"
        db.write()
        writeToTerminal("Added player data")
    })
}

//opens window to select file to download mock data
function openOffers(){
    csv(['AccountNumber', 'OfferCode', 'OfferName', 'OfferValue', 'OfferStartDate', 'OfferEndDate'])
    let dialog = remote.dialog
    dialog.showOpenDialog({
        title: 'Open Offer Data',
        filters: [
            {name: 'csv', extensions: ['csv']}
        ]
    }, (fileName) => {
        if(fileName === undefined){
            return;
        } 
        offers = []
        fs.createReadStream(fileName[0])
        .pipe(csv())
        .on('data', (data) => {
            offers.push(data)
        })
        .on('end' , () => {
            db.set('offers', offers).write()
        })
        document.getElementById("offer-data-status").innerText = "Offer Data ✔️"
        db.write()
        writeToTerminal("Added offer data")
    })
}

//opens window to select file to download mock data
function openCoupons(){
    db.read()
    csv(["CouponNumber", "Balance"])
    let dialog = remote.dialog
    dialog.showOpenDialog({
        title: 'Open Coupon Data',
        filters: [
            {name: 'csv', extensions: ['csv']}
        ]
    }, (fileName) => {
        if(fileName === undefined){
            return;
        } 
        coupons = []
        fs.createReadStream(fileName[0])
        .pipe(csv())
        .on('data', (data) => {
            coupons.push(data)
        })
        .on('end' , () => {
            db.set('coupons', coupons).write()
        })
        document.getElementById("coupon-data-status").innerText = "Coupon Data ✔️"
        db.write()
        writeToTerminal("Added coupon data")
        updateCouponTable() 
    })
}

//checks status of data and then updates app to 'refresh'
function checkUploaded() {
    updateCouponTable()
    updateTable()
    checkPointsToDollars()
    checkRetailRating()
    checkRunningPort()
}

function checkPointsToDollars(){
    let pointsToDollars = db.get('pointsToDollars').value()
    document.getElementById('pointsToDollars').textContent = pointsToDollars + " : 1"
}

function checkRetailRating(){
    let retailRating = db.get('retailRating').value()
    document.getElementById('retail-rating').textContent = retailRating + " : 1"
}

function checkRunningPort(){
    let port = db.get('port').value()
    document.getElementById('port-alert').textContent = `Port is currently ${port}`
    ipcRenderer.send("editPort", port)
}

function resetDatabase(){
    db.set('players', []).write()
    db.set('offers', []).write()
    db.set('coupons', []).write()
    db.set('transactions', []).write()
    db.set('transactionId', 0).write()
    db.set('pointsToDollars', 1).write()
    db.set('retailRating', 1).write()

    checkUploaded() //reset app
}