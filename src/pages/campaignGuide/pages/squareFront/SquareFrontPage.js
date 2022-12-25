import Page from "../Page";
import squareFrontBackground from "../../../../../public/templates/campaignGuides/campaignGuideSquareFront.png";
import SquareFrontPageView from "./SquareFrontPageView";

export default class SquareFrontPage extends Page {
    static type = "Square Front";
    static background = squareFrontBackground;

    constructor(pageOrId) {
        super(pageOrId, SquareFrontPage.type, SquareFrontPage.background);
        const page = typeof pageOrId === "number" || !pageOrId ? {} : pageOrId;
        this.title = page.title || "";
    }

    getView() {
        return <SquareFrontPageView key={this.id} page={this} />;
    }
}
