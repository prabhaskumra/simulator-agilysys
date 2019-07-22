function newWindow(){
    // let playerInfo = ""

    // playerInfo += (
    //     "<span id='add-player' style='display: none'>" +
    //     "<h1>Edit Player Data</h1>" +
    //     "<div id='addPlayer'></div>"+
    //     "<button class='button button2' >Hello</button>" +
    //     "<button class='button button2' id='close-button'>Close</button>"+
    //     "</span>"
    // )


    document.getElementById('add-player').style.display = 'block'
    document.getElementById('edit-players').style.display = 'none'
    //document.getElementById('settings-button').style.visibility = 'hidden'


}

function loadTable(){
    document.getElementById('add-player').style.display = 'none'
    document.getElementById('edit-players').style.display = 'block'
}