const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("fs", {
    openCampaign: () => {
        return ipcRenderer.invoke("fs:openCampaign");
    },
    saveCampaign: (campaign) => {
        return ipcRenderer.invoke("fs:saveCampaign", campaign);
    },
    saveAsCampaign: (campaign) => {
        return ipcRenderer.invoke("fs:saveAsCampaign", campaign);
    },
    openLastOpened: () => {
        return ipcRenderer.invoke("fs:openLastOpened");
    },
    saveLastOpened: (path) => {
        return ipcRenderer.invoke("fs:saveLastOpened", path);
    },
    chooseImage: () => {
        return ipcRenderer.invoke("fs:chooseImage");
    },
    chooseIcon: () => {
        return ipcRenderer.invoke("fs:chooseIcon");
    },
    openImage: (path) => {
        return ipcRenderer.invoke("fs:openImage", path);
    },
    exportFile: (campaignPath, cardSetName, fileName, dataView) => {
        return ipcRenderer.invoke("fs:exportFile", campaignPath, cardSetName, fileName, dataView);
    },
    exportTtsSaveObject: (campaignPath, cardSetName, fileName, ttsSaveObject) => {
        return ipcRenderer.invoke("fs:exportTtsSaveObject", campaignPath, cardSetName, fileName, ttsSaveObject);
    }
});
