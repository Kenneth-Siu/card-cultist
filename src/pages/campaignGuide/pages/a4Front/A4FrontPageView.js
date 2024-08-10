import React from "react";
import A4FrontPageCanvas from "./A4FrontPageCanvas";
import PageView from "../PageView";

export default function A4FrontPageView({ page, pageNumber }) {
    return (
        <PageView
            page={page}
            pageNumber={pageNumber}
            toolbarExtras={
                <input
                    type="text"
                    className="title-page-title-input"
                    value={page.title}
                    onChange={(event) => setTitle(event.target.value)}
                />
            }
            canvas={<A4FrontPageCanvas page={page} pageNumber={pageNumber} />}
        />
    );

    function setTitle(title) {
        page.title = title;
        refreshCampaign();
    }
}
