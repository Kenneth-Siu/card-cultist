import remove from "lodash.remove";
import generateId from "../../helpers/generateId";
import { DEFAULT_CAMPAIGN_GUIDE_COLOR_THEME } from "./campaignGuideConstants";
import getPageClassInstance from "./pages/getPageClassInstance";
import listOfPageTypes from "./pages/listOfPageTypes";

export default class CampaignGuide {
    constructor(campaignGuide) {
        Object.assign(this, campaignGuide);
        if (!campaignGuide) {
            campaignGuide = {};
        }
        this.colorTheme = campaignGuide.colorTheme || DEFAULT_CAMPAIGN_GUIDE_COLOR_THEME;
        this.pages = Array.isArray(campaignGuide.pages)
            ? campaignGuide.pages.map((page) => getPageClassInstance(page))
            : [];
    }

    addPage(pageType, index) {
        for (let i = 0; i < listOfPageTypes.length; i++) {
            if (listOfPageTypes[i].type === pageType) {
                this.pages.splice(index, 0, new listOfPageTypes[i](generateId(this.pages)));
            }
        }
    }

    swapPageUp(page) {
        const index = this.pages.findIndex((p) => p === page);
        if (index > 0) {
            this.swapPages(index - 1, index);
        }
    }

    swapPageDown(page) {
        const index = this.pages.findIndex((p) => p === page);
        if (index > -1 && index < this.pages.length - 1) {
            this.swapPages(index + 1, index);
        }
    }

    swapPages(index1, index2) {
        [this.pages[index1], this.pages[index2]] = [this.pages[index2], this.pages[index1]];
    }

    deletePage(page) {
        remove(this.pages, (p) => p === page);
    }
}
