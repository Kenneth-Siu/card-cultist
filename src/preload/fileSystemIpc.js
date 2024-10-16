const { ipcMain, dialog } = require("electron");
const path = require("path");
const { readFile, writeFile, mkdir } = require("node:fs/promises");

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

async function saveLastOpened(event, filePath) {
    await writeFile("./.lastopened", filePath, { encoding: "utf-8" });
}

async function chooseImage() {
    const { cancelled, filePaths } = await dialog.showOpenDialog({
        filters: [{ name: "Images", extensions: ["jpg", "jpeg", "png", "svg"] }],
    });
    if (cancelled) {
        return;
    }
    return filePaths[0];
}

async function chooseIcon() {
    const { cancelled, filePaths } = await dialog.showOpenDialog({
        filters: [{ name: "Images", extensions: ["png", "svg"] }],
    });
    if (cancelled) {
        return;
    }
    return filePaths[0];
}

async function openImage(event, path) {
    return await readFile(path);
}

async function exportFile(event, campaignPath, cardSetName, fileName, dataView) {
    const exportsFolderPath = path.join(campaignPath, "..", "Exports");
    try {
        await mkdir(exportsFolderPath);
    } catch (exception) {
        if (exception.code !== "EEXIST") {
            // TODO proper error handling...
            console.log(exception);
        }
    }
    if (cardSetName) {
        try {
            await mkdir(path.join(exportsFolderPath, cardSetName));
        } catch (exception) {
            if (exception.code !== "EEXIST") {
                // TODO proper error handling...
                console.log(exception);
            }
        }
    }
    await writeFile(path.join(exportsFolderPath, cardSetName, fileName), dataView);
}

async function exportTtsSaveObject(event, campaignPath, fileName, ttsSaveObject) {
    const exportsFolderPath = path.join(campaignPath, "..", "Exports");
    try {
        await mkdir(exportsFolderPath);
    } catch (exception) {
        if (exception.code !== "EEXIST") {
            // TODO proper error handling...
            console.log(exception);
        }
    }
    try {
        await mkdir(path.join(exportsFolderPath, "ttsSaveObjects"));
    } catch (exception) {
        if (exception.code !== "EEXIST") {
            // TODO proper error handling...
            console.log(exception);
        }
    }
    await writeFile(path.join(exportsFolderPath, "ttsSaveObjects", fileName), JSON.stringify(ttsSaveObject), { encoding: "utf-8" });
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
    ipcMain.handle("fs:exportFile", exportFile);
    ipcMain.handle("fs:exportTtsSaveObject", exportTtsSaveObject);
}

module.exports = { initFileSystemIpc };
