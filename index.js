const { app, BrowserWindow } = require('electron')

function createWindow () {
  let win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    }
  })

//  win.removeMenu()
  win.setMenuBarVisibility(false)

  win.loadFile('index.html')
}

app.whenReady().then(createWindow)
