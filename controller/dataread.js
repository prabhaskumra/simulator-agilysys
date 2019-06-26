const { remote } = require('electron')
const fs = require('fs')
const csv = require('csv-parser')

var players = []

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
    })
}

function parseCSVData(file) {
    csv(['firstName', 'lastName', 'accountNumber', 'tierLevel', 'pointBalance']);
    csv({ separator: ',' });

     fs.createReadStream(file)
        .pipe(csv())
        .on('data', (data) => players.push(data))
        .on('end' , () => {
            console.log(players);
        });
}


