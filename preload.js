const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("fs", {
    loadProject: () => {
        return ipcRenderer.invoke("fs:openProject");
    },
    saveProject: (project) => {
        return ipcRenderer.invoke("fs:saveProject", project);
    },
});
