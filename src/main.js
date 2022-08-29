const { app, BrowserWindow } = require("electron");
const path = require("path");
const { initFileSystemIpc } = require("./preload/fileSystemIpc");

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1280,
        height: 1024,
        webPreferences: {
            preload: path.join(app.getAppPath(), "src", "preload", "preload.js"),
        },
    });

    win.loadURL("http://localhost:3000");
    // win.loadFile(path.join(app.getAppPath(), "build", "public", "index.html"));
};

app.whenReady().then(() => {
    initFileSystemIpc();
    createWindow();
});
