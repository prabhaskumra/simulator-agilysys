const { ipcRenderer, remote } = require('electron')
const fs = require('fs')
const csv = require('csv-parser')
const path = require('path')

var players = []
var offers = []

var appReady = false


//checks to see if data is loaded, if not, show message
function isAppReady(){
    let playerExists = false
    let offersExists = false

    if(fs.existsSync(path.join('./data/data.json'))) {
        playerExists = true

    } else {
        console.log('player info missing')
    }

    if(fs.existsSync(path.join('./data/offers.json'))) {
        offersExists = true 
    } else {
        console.log('player info missing')
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
            players.push(data)
        })
        .on('end' , () => {
            fs.writeFile(path.join('./data/data.json'), JSON.stringify(players), 'utf8', function(err){
                if(err) console.log(err); 
                isAppReady()
            })
        })
        document.getElementById("player-data-status").innerText = "Player Data ✔️"
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
            offers.push(data)
        })
        .on('end' , () => {
            fs.writeFile(path.join('./data/offers.json'), JSON.stringify(offers), 'utf8', function(err){
                if(err) console.log(err); 
                isAppReady()
            })
        })
        document.getElementById("offer-data-status").innerText = "Offer Data ✔️"
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
                    fs.writeFile(path.join('.'), JSON.stringify(players), 'utf8', function(err){
                        if(err){ 
                                console.log(err); 
                        } else {
                        }})
                    break
                case 'offer-data':
                    console.log(' in here')
                    offers = dataArray
                    fs.writeFile(path.join('./data/offers.json'), JSON.stringify(offers), 'utf8', function(err){
                        if(err){ 
                                console.log(err); 
                        } else {
                        }})
                    break
            }
        })
}



//checks to see if files were already uploaded and stored locally
function checkUploaded() {
    console.log('here')
    fs.access(path.join('./data/data.json'), fs.constants.F_OK, (err) => {
        if (err) {
            document.getElementById('player-data-status').textContent = "Player Data ❌"
        } else {
            document.getElementById('player-data-status').textContent = "Player Data ✔️"

            players = JSON.parse(fs.readFileSync(path.join('./data/data.json'),'utf8'))
        }
    })

    fs.access(path.join('./data/offers.json'), fs.constants.F_OK, (err) => {
        if (err) {
            document.getElementById('offer-data-status').textContent = "Offer Data ❌"
        } else {
            document.getElementById('offer-data-status').textContent = "Offer Data ✔️"

            offers = JSON.parse(fs.readFileSync(path.join('./data/offers.json'),'utf8'))
        }
    })

    isAppReady()
}
