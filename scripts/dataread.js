const { remote } = require('electron')
const fs = require('fs')
const csv = require('csv-parser')
const path = require('path')

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
        document.getElementById('imported').style.display = 'block'
    })
}

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