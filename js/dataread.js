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
            //display form for search now yay hoozah
            document.getElementById('insertMockData').style.display = 'none'
            document.getElementById('search-form').style.display = 'block'
            }
        })
    })
}

function parseCSVData(data) {
    //for prabhas
}

function searchSubmit(){
    //error checking
    if(document.getElementById('player').textContent == ""){
        //not valid
        return;
    }
}
