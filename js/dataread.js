const { remote } = require('electron')
const fs = require('fs')

const csv = require('csv-parser')
const results = [];

csv(['firstName', 'lastName', 'accountNumber', 'tierLevel', 'pointBalance']);
csv({ separator: ',' });

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
        fs.readFile(file, 'utf-8', (err, data) => {
            console.log(data)
            parseCSVData(data)
            //data is inside here now
            //TO-DO: Parse data
        })
    })
}

function parseCSVData(data) {
    //for prabhas
    //d3.csv(data).then(function(arr){
     //   console.log(arr[0]);
    //})

}


