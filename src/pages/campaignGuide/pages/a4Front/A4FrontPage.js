import React from "react";
import Page from "../Page";
import a4FrontBackground from "../../../../../public/templates/campaignGuides/campaignGuideA4Front.png";
import A4FrontPageView from "./A4FrontPageView";

export default class A4FrontPage extends Page {
    static type = "A4 Front";
    static background = a4FrontBackground;

    constructor(pageOrId) {
        super(pageOrId, A4FrontPage.type, A4FrontPage.background);
        const page = typeof pageOrId === "number" || !pageOrId ? {} : pageOrId;
        this.title = page.title || "";
    }

    getView(pageNumber) {
        return <A4FrontPageView key={this.id} page={this} pageNumber={pageNumber} />;
    }
}
