const { ipcMain, dialog } = require("electron");
const { readFile, writeFile } = require("node:fs/promises");

async function openCampaign() {
    const { cancelled, filePaths } = await dialog.showOpenDialog({
        filters: [{ name: "Card Cultist Campaigns", extensions: ["cardcultist"] }],
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

async function saveCampaign(event, campaign) {
    await writeFile(campaign.path, JSON.stringify(campaign.data), { encoding: "utf-8" });
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
    ipcMain.handle("fs:openCampaign", openCampaign);
    ipcMain.handle("fs:saveCampaign", saveCampaign);
    ipcMain.handle("fs:openImage", openImage);
}

module.exports = { initFileSystemIpc };
