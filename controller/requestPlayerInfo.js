
function submitSearch(){
    let searchValue = document.getElementById('player-request-text-box').value
    let account = searchPlayers(searchValue)
    console.log(players)
    console.log(account)
}

function searchPlayers(id){
    id = parseInt(id)
    for (var i=0; i < players.length; i++) {
        console.log(players[i].AccountNumber)
        console.log(id)
        if (players[i].AccountNumber === id) {
            return players[i];
        }
    }
}
