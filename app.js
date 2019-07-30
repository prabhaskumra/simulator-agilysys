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
    frame: false,
    minWidth: 800,
    minHeight:600,
    icon: './image_assets/spades.png',
    webPreferences: {
      nodeIntegration: true,
    },
    show: false
  })
  // and load the index.html of the app.
    win.loadURL('http://localhost:8080')
    win.once('ready-to-show', () => {
      win.show()
    })
}

app.on('ready', () => {
  createWindow()
})
