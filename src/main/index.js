import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron';
import { join, resolve } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import icon from '../../resources/icon.png?asset';
import { setWallpaper } from 'wallpaper';


function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    resizable: true,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      nodeIntegration: true,
      preload: join(__dirname, '../preload/index.mjs'),
      sandbox: false,
    },
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });


  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }
}

app.whenReady().then(() => {
  // Set app user model id for Windows
  electronApp.setAppUserModelId('com.electron');

  // Watch for window shortcuts
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  // Create the main window
  createWindow();

  // Re-create a window in the app when the dock icon is clicked (macOS)
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('openDialog', async (event, props) => {

  try {
    // Show confirmation dialog
    const result = await dialog.showMessageBox(props.dialog);

    // If user selects 'No' or closes the dialog, do nothing
    if (result.response !== 0) {
      return { success: false, message: 'User cancelled the operation.' };
    }

    console.log('The "Yes" button was pressed (main process)');


    const wallpaperPath = resolve(props.path
    );
    console.log(wallpaperPath)

    // Set the wallpaper
    await setWallpaper(wallpaperPath);
    console.log('Wallpaper has been changed.');

    return { success: true, message: 'Wallpaper has been successfully changed.' };
  } catch (error) {
    console.error('Error handling openDialog:', error);
    return { success: false, message: 'An error occurred while setting the wallpaper.' };
  }
});


