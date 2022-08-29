const { ipcMain, dialog } = require("electron");
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

async function openImage() {
    const { cancelled, filePaths } = await dialog.showOpenDialog({
        filters: [{ name: "Images", extensions: ["jpg", "png"] }],
    });
    if (cancelled) {
        return;
    } else {
        const path = filePaths[0];
        return {
            path,
            data: await readFile(path),
        };
    }
}

function initFileSystemIpc() {
    ipcMain.handle("fs:openProject", openProject);
    ipcMain.handle("fs:saveProject", saveProject);
    ipcMain.handle("fs:openImage", openImage);
}

module.exports = { initFileSystemIpc };
