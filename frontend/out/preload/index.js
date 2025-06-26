"use strict";
const electron = require("electron");
const preload = require("@electron-toolkit/preload");
const api = {
  send: (channel, data) => {
    const validChannels = ["open-network-path"];
    if (validChannels.includes(channel)) {
      electron.ipcRenderer.send(channel, data);
    }
  }
};
if (process.contextIsolated) {
  try {
    electron.contextBridge.exposeInMainWorld("electron", preload.electronAPI);
    electron.contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  window.electron = preload.electronAPI;
  window.api = api;
}
