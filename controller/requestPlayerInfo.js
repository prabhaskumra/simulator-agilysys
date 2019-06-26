
function submitSearch(){
    let searchValue = document.getElementById('player-request-text-box').value
    let account = searchPlayers(searchValue)

}

function submitJSON(){
    let dialog = remote.dialog
    dialog.showOpenDialog({
        title: 'Open JSON file',
        filters: [
            {name: 'text', extensions: ['txt']}
        ]
    }, (fileName) => {
        if(fileName === undefined){
            return
        }
        fs.readFile(fileName[0], 'utf8', (err, data) => {
            if(err){
                console.log(err)
            } else {
                let inRequest = JSON.parse(data)
                console.log(inRequest["acct"])
                console.log(searchPlayers(inRequest["acct"]))
            }
        })
    })
}


function searchPlayers(id){
    for (var i=0; i < players.length; i++) {
        if (players[i].accountNumber === id) {
            return players[i];
        }
    }
}
