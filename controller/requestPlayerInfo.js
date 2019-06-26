const Path = require('path')
const { players }'../controller/dataread'

function submitSearch(){
    let searchValue = document.getElementById('player-request-text-box').textContent
    //let account = searchPlayers(searchValue)
    //console.log(account)
    console.log(process.cwd())
    console.log(players[1].AccountNumber)

}



function searchPlayers(id){
    for (var i=0; i < players.length; i++) {
        if (players[i].AccountNumber === id) {
            return players[i];
        }
    }
}
