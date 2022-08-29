const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const { readFile, writeFile } = require("node:fs/promises");

async function openProject() {
    const { cancelled, filePaths } = await dialog.showOpenDialog({
        filters: [{ name: "Card Cultist Projects", extensions: ["cardcultist"] }],
    });
    if (cancelled) {
        return;
    } else {
        const path = filePaths[0];
        return {
            path,
            data: JSON.parse(await readFile(path, { encoding: "utf-8" })),
        };
    }
}

async function saveProject(event, project) {
    console.log(project);
    await writeFile(project.path, JSON.stringify(project.data), { encoding: "utf-8" });
}

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1280,
        height: 1024,
        webPreferences: {
            preload: path.join(app.getAppPath(), "src", "preload", "preload.js"),
        },
    });

    win.loadURL("http://localhost:3000");
};

app.whenReady().then(() => {
    ipcMain.handle("fs:openProject", openProject);
    ipcMain.handle("fs:saveProject", saveProject);
    createWindow();
});
