const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');
const server = require('./server');

let win;

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 600})

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  win.webContents.openDevTools()

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('active', () => {
  if (win === null){
    createWindow();
  }
});


// Configure Network Settings
