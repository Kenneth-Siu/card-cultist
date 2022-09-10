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
        const campaign = {
            ...JSON.parse(await readFile(path, { encoding: "utf-8" })),
            path,
        };
        await saveLastOpened(undefined, path);
        return campaign;
    }
}

async function saveCampaign(event, campaign) {
    await writeFile(campaign.path, JSON.stringify(campaign), { encoding: "utf-8" });
    await saveLastOpened(undefined, campaign.path);
}

async function saveAsCampaign(event, campaign) {
    const { cancelled, filePath } = await dialog.showSaveDialog({
        filters: [{ name: "Card Cultist Campaigns", extensions: ["cardcultist"] }],
    });
    if (cancelled) {
        return;
    } else {
        await writeFile(filePath, JSON.stringify({ ...campaign, path: filePath }), { encoding: "utf-8" });
        await saveLastOpened(undefined, filePath);
        return filePath;
    }
}

async function openLastOpened() {
    try {
        const path = await readFile("./.lastopened", { encoding: "utf-8" });
        return {
            ...JSON.parse(await readFile(path, { encoding: "utf-8" })),
            path,
        };
    } catch (e) {
        if (e.code === "ENOENT") {
            return;
        }
    }
}

async function saveLastOpened(event, path) {
    await writeFile("./.lastopened", path, { encoding: "utf-8" });
}

async function chooseImage() {
    const { cancelled, filePaths } = await dialog.showOpenDialog({
        filters: [{ name: "Images", extensions: ["jpg", "png"] }],
    });
    if (cancelled) {
        return;
    }
    return filePaths[0];
}

async function chooseIcon() {
    const { cancelled, filePaths } = await dialog.showOpenDialog({
        filters: [{ name: "Images", extensions: ["png"] }],
    });
    if (cancelled) {
        return;
    }
    return filePaths[0];
}

async function openImage(event, path) {
    return await readFile(path);
}

function initFileSystemIpc() {
    ipcMain.handle("fs:openCampaign", openCampaign);
    ipcMain.handle("fs:saveCampaign", saveCampaign);
    ipcMain.handle("fs:saveAsCampaign", saveAsCampaign);
    ipcMain.handle("fs:openLastOpened", openLastOpened);
    ipcMain.handle("fs:saveLastOpened", saveLastOpened);
    ipcMain.handle("fs:chooseIcon", chooseIcon);
    ipcMain.handle("fs:chooseImage", chooseImage);
    ipcMain.handle("fs:openImage", openImage);
}

module.exports = { initFileSystemIpc };
