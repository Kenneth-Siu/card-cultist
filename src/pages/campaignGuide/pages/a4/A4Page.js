import React from "react";
import Page from "../Page";
import a4Background from "../../../../../public/templates/campaignGuides/campaignGuideA4.png";
import A4PageView from "./A4PageView";

export default class A4Page extends Page {
    static type = "A4";
    static background = a4Background;

    constructor(pageOrId) {
        super(pageOrId, A4Page.type, A4Page.background);
    }

    getView(pageNumber) {
        return <A4PageView key={this.id} page={this} pageNumber={pageNumber} />;
    }
}
