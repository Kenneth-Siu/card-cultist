const { ipcMain, dialog } = require("electron");

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

export function initFileSystemIpc() {
    ipcMain.handle("fs:openProject", openProject);
    ipcMain.handle("fs:saveProject", saveProject);
}
