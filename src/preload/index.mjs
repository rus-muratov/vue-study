import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { setWallpaper } from 'wallpaper'
const path = require('path');
// Custom APIs for renderer
const api = {}


if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)

    contextBridge.exposeInMainWorld('path', {
      join: (...args) => path.join(...args),
    });
    contextBridge.exposeInMainWorld('ipcRenderer', {

      send: (channel, data) => ipcRenderer.send(channel, data),
      on: (channel, func) =>
        ipcRenderer.on(channel, (event, ...args) => func(...args)),

      openDialog: (channel, settings) => {
        console.log(settings)
        ipcRenderer.send('openDialog', channel, settings)
        },
        dialogResponse: (response) => {
          ipcRenderer.on('dialogResponse', response);
        }
      })

    contextBridge.exposeInMainWorld('wallpaper', {
      wallpaper: setWallpaper,
    });
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
