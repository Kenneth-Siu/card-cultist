import React from "react";

export const CampaignContext = React.createContext({
    campaign: null,
    setNewCampaign: (title) => {},
    loadCampaign: (campaign) => {},
    refreshCampaign: () => {},
});
