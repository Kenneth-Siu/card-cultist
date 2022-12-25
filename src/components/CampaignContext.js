import React from "react";

export const CampaignContext = React.createContext({
    campaign: null,
    refreshCampaign: () => {},
});
