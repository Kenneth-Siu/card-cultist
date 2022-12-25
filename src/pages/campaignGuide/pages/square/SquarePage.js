import React from "react";
import Page from "../Page";
import squareBackground from "../../../../../public/templates/campaignGuides/campaignGuideSquare.png";
import SquarePageView from "./SquarePageView";

export default class SquarePage extends Page {
    static type = "Square";
    static background = squareBackground;

    constructor(pageOrId) {
        super(pageOrId, SquarePage.type, SquarePage.background);
    }

    getView(pageNumber) {
        return (
            <SquarePageView
                key={this.id}
                page={this}
                pageNumber={pageNumber}
            />
        );
    }
}
