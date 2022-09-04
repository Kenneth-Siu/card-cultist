const { ipcMain, dialog } = require("electron");
const { readFile, writeFile } = require("node:fs/promises");

// TODO handle file read/write failures

async function openCampaign() {
    const { cancelled, filePaths } = await dialog.showOpenDialog({
        filters: [{ name: "Card Cultist Campaigns", extensions: ["cardcultist"] }],
    });
    if (cancelled) {
        return;
    } else {
        const path = filePaths[0];
        return {
            ...JSON.parse(await readFile(path, { encoding: "utf-8" })),
            path,
        };
    }
}

async function saveCampaign(event, campaign) {
    await writeFile(campaign.path, JSON.stringify(campaign), { encoding: "utf-8" });
}

async function saveAsCampaign(event, campaign) {
    const { cancelled, filePath } = await dialog.showSaveDialog({
        filters: [{ name: "Card Cultist Campaigns", extensions: ["cardcultist"] }],
    });
    if (cancelled) {
        return;
    } else {
        await writeFile(filePath, JSON.stringify({ ...campaign, path: filePath }), { encoding: "utf-8" });
        return filePath;
    }
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
    ipcMain.handle("fs:saveAsCampaign", saveAsCampaign);
    ipcMain.handle("fs:openImage", openImage);
}

module.exports = { initFileSystemIpc };
