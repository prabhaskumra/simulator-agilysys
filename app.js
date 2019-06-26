const { app, BrowserWindow, dialog } = require('electron')

function createWindow(){
    let win = new BrowserWindow({
        width: 800,
        height:600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.loadFile('views/simulator.html')
}

app.on('ready', createWindow)