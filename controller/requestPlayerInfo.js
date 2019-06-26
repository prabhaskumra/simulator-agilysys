
function submitSearch(){
    let searchValue = document.getElementById('player-request-text-box').value
    let account = searchPlayers(searchValue)
    console.log(players)
    console.log(account)
}

function searchPlayers(id){
    for (var i=0; i < players.length; i++) {
        if (players[i].accountNumber === id) {
            return players[i];
        }
    }
}
