const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("fs", {
    loadCampaign: () => {
        return ipcRenderer.invoke("fs:openCampaign");
    },
    saveCampaign: (campaign) => {
        return ipcRenderer.invoke("fs:saveCampaign", campaign);
    },
    loadImage: () => {
        return ipcRenderer.invoke("fs:openImage");
    }
});
