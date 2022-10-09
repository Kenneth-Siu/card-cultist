import generateId from "../helpers/generateId";
import getPageClassInstance from "../pages/campaignGuide/pages/getPageClassInstance";
import listOfPageTypes from "../pages/campaignGuide/pages/listOfPageTypes";

export default class CampaignGuide {
    constructor(campaignGuide) {
        Object.assign(this, campaignGuide);
        if (!campaignGuide) {
            campaignGuide = {};
        }
        this.colorTheme = campaignGuide.colorTheme || "rgba(41,98,95,0)";
        this.pages = Array.isArray(campaignGuide.pages)
            ? campaignGuide.pages.map((page) => getPageClassInstance(page))
            : [];
    }

    addPage(pageType) {
        for (let i = 0; i < listOfPageTypes.length; i++) {
            if (listOfPageTypes[i].type === pageType) {
                this.pages.push(new listOfPageTypes[i](generateId(this.pages)));
            }
        }
    }
}
