const { app, BrowserWindow } = require('electron')
const server = require('./server')
const fs = require('fs')
const path = require('path')


var win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    }
  })
  // and load the index.html of the app.
    win.loadURL('http://localhost:1234')
}


app.on('ready', () => {
  createWindow()
  win.on('close', () =>{
    console.log('closing app')
    fs.truncate(path.join(__dirname+'/transaction.json'), 0, (err) => {
      if(err) throw err;
      console.log("deleted transaction.json")
    })
  })
})
