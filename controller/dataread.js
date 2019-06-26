const { remote } = require('electron')
const fs = require('fs')

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

        var file = fileName[0]
        fs.readFile(file, 'utf-8', (err, data) => {
            if(err){
                dialog.showMessageBox("Whoops, can't open file!", err.message)
            } else {
            //file read successfully
            //console.log(data)
            parseCSVData(data)

            //DELETE THIS AFTER CSV DATA DONE THIS IS TEMP
            var players = [
                {
                    AccountNumber: 7777,
                    FirstName: "Bally",
                    LastName: "Mock Service 1"
                },
                {
                    AccountNumber: 6666,
                    FirstName: "Daee",
                    LastName: "Kang"
                },
                {
                    AccountNumber: 5555,
                    FirstName: "Prabhas",
                    LastName: "Kumra"
                },
            ] 

            //display form for search now yay hoozah
            //TO-DO: display success message
            window.location.href = "requestPlayer.html"
            }
        })
    })
}

function parseCSVData(data) {
    //for prabhas
}

module.exports.players = players
