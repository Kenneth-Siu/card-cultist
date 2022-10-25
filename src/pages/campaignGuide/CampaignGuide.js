import remove from "lodash.remove";
import generateId from "../../helpers/generateId";
import getPageClassInstance from "./pages/getPageClassInstance";
import listOfPageTypes from "./pages/listOfPageTypes";

export default class CampaignGuide {
    constructor(campaignGuide) {
        Object.assign(this, campaignGuide);
        if (!campaignGuide) {
            campaignGuide = {};
        }
        this.colorTheme = campaignGuide.colorTheme || "rgb(38,73,59)";
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

    deletePage(page) {
        remove(this.pages, (p) => p === page);
    }
}
