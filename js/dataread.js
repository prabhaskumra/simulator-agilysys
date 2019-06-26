const csv = require('csv-parser')
const { remote } = require('electron')
const fs = require('fs')
var players = [];


function openFile(){

    let dialog = remote.dialog
    dialog.showOpenDialog({
        title: 'Open Mock Data',
        filters: [
            {name: 'csv', extensions: ['csv']}
        ]
    }, (fileName) => {
        if(fileName === undefined) return; //file not picked
        var file = fileName[0]
        parseCSVData(file)
    })
}

function parseCSVData(file) {
    csv(['firstName', 'lastName', 'accountNumber', 'tierLevel', 'pointBalance']);
    csv({ separator: ',' });

    fs.createReadStream(file)
        .pipe(csv())
        .on('data', (data) => players.push(data))
        .on('end' , () => {
            //console.log(players);
        });

}
