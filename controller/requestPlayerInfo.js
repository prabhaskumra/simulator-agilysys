
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
                let account = searchPlayers(inRequest["acct"])
                let out = (
                    "First Name: " + account["firstName"] + "\r\n" +
                    "Last Name: " + account["lastName"] + "\r\n" +
                    "Account #: " + account["accountNumber"] + "\r\n" + 
                    "Tier Level: " + account["tierLevel"] + '\n' +
                    "Point Balance: " + account["pointBalance"] + '\n'
                )
                document.getElementById('output').textContent = out
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
