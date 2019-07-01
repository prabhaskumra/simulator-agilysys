const { remote } = require('electron')
const fs = require('fs')
const csv = require('csv-parser')
const path = require('path')

var players = []

//opens window to select file to download mock data
function openFile(){
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
        parseCSVData(fileName[0])
        document.getElementById('imported').style.display = 'block'
    })
}

//read in mock data and seperate into objects and then into an array and then write it to data.json
function parseCSVData(file) {
    csv(['firstName', 'lastName', 'accountNumber', 'tierLevel', 'pointBalance']);
    csv({ separator: ',' });

     fs.createReadStream(file)
        .pipe(csv())
        .on('data', (data) => players.push(data))
        .on('end' , () => {
            fs.writeFile(path.join('./data.json'), JSON.stringify(players), 'utf8', function(err){
                if(err){ 
                        console.log(err); 
                } else {
                }});;
        })
}

//checks to see if foundAccount.json has updated, meaning that there was a query and result was found
fs.watchFile(path.join('./foundAccount.json'), (curr, prev) => {
    console.log('file changed')
    file = fs.readFileSync('./data.json')

    let foundAccount = JSON.parse(fs.readFileSync(path.join('./foundAccount.json')), 'utf8')
    //display results onto electron window
    document.getElementById('player-data').innerHTML = (
        "<b> First Name: </b>" + foundAccount.firstName + "</br>" +
        "<b> Last Name: </b>" + foundAccount.lastName + "</br>" +
        "<b> Point Balance: </b>" + foundAccount.pointBalance + "</br>" +
        "<b> Tier Level: </b>" + foundAccount.tierLevel + "</br>"
    )
    console.log(foundAccount)
})