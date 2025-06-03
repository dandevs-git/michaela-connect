// import { spawn } from 'child_process'
// import { app, shell, BrowserWindow, ipcMain } from 'electron'
// import { join } from 'path'
// import { electronApp, optimizer, is } from '@electron-toolkit/utils'
// import { nativeTheme } from 'electron'

// let laravelServer = null

// const icon = join(__dirname, '../../resources/icon.ico')
// const laravelPath = join(__dirname, '../../../backend')

// nativeTheme.themeSource = 'dark'

// ipcMain.on('open-network-path', (event, ip) => {
//     shell.openPath(`\\\\${ip}`)
// })

// function startLaravelServer() {
//     laravelServer = spawn('php', ['artisan', 'serve', '--host=127.0.0.1', '--port=8000'], {
//         cwd: laravelPath,
//         stdio: 'inherit',
//         shell: true
//     })

//     laravelServer.on('error', (err) => {
//         console.error('Failed to start Laravel server:', err)
//     })
// }

// function stopLaravelServer() {
//     if (laravelServer) {
//         laravelServer.kill()
//         laravelServer = null
//     }
// }

// function createWindow() {
//     const mainWindow = new BrowserWindow({
//         width: 900,
//         height: 670,
//         show: false,
//         autoHideMenuBar: true,
//         icon: icon,
//         webPreferences: {
//             preload: join(__dirname, '../preload/index.js'),
//             sandbox: false,
//             contextIsolation: true,
//             nodeIntegration: false
//         }
//     })

//     mainWindow.on('ready-to-show', () => {
//         mainWindow.show()
//     })

//     mainWindow.webContents.setWindowOpenHandler((details) => {
//         shell.openExternal(details.url)
//         return { action: 'deny' }
//     })

//     startLaravelServer()

//     if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
//         mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
//     } else {
//         mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
//     }
// }

// app.whenReady().then(() => {
//     electronApp.setAppUserModelId('com.electron')

//     app.on('browser-window-created', (_, window) => {
//         optimizer.watchWindowShortcuts(window)
//     })

//     ipcMain.on('ping', () => console.log('pong'))

//     createWindow()

//     app.on('activate', function () {
//         if (BrowserWindow.getAllWindows().length === 0) createWindow()
//     })
// })

// app.on('window-all-closed', () => {
//     stopLaravelServer()

//     if (process.platform !== 'darwin') {
//         app.quit()
//     }
// })

// app.on('quit', () => {
//     stopLaravelServer()
// })

import { spawn } from 'child_process'
import { app, shell, BrowserWindow, ipcMain, nativeTheme } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'

let laravelServer = null
const icon = join(__dirname, '../../resources/icon.ico')

// Handle Laravel path depending on dev/build mode
const laravelPath = app.isPackaged
    ? join(process.resourcesPath, 'backend') // e.g., dist/win-unpacked/resources/backend
    : join(__dirname, '../../../backend') // dev path

nativeTheme.themeSource = 'dark'

ipcMain.on('open-network-path', (event, ip) => {
    shell.openPath(`\\\\${ip}`)
})

function startLaravelServer() {
    laravelServer = spawn('php', ['artisan', 'serve', '--host=127.0.0.1', '--port=8000'], {
        cwd: laravelPath,
        shell: true
    })

    laravelServer.stdout?.on('data', (data) => {
        console.log(`[Laravel stdout]: ${data}`)
    })

    laravelServer.stderr?.on('data', (data) => {
        console.error(`[Laravel stderr]: ${data}`)
    })

    laravelServer.on('error', (err) => {
        console.error('❌ Failed to start Laravel server:', err)
    })

    laravelServer.on('exit', (code, signal) => {
        console.log(`Laravel server exited (code: ${code}, signal: ${signal})`)
    })
}

function stopLaravelServer() {
    if (laravelServer) {
        laravelServer.kill()
        laravelServer = null
    }
}

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 900,
        height: 670,
        show: false,
        autoHideMenuBar: true,
        icon,
        webPreferences: {
            preload: join(__dirname, '../preload/index.js'),
            sandbox: false,
            contextIsolation: true,
            nodeIntegration: false
        }
    })

    mainWindow.on('ready-to-show', () => {
        mainWindow.show()
    })

    mainWindow.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url)
        return { action: 'deny' }
    })

    startLaravelServer()

    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    } else {
        mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
    }
}

app.whenReady().then(() => {
    electronApp.setAppUserModelId('com.electron')

    app.on('browser-window-created', (_, window) => {
        optimizer.watchWindowShortcuts(window)
    })

    ipcMain.on('ping', () => console.log('pong'))

    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    stopLaravelServer()
    if (process.platform !== 'darwin') app.quit()
})

app.on('quit', () => {
    stopLaravelServer()
})
