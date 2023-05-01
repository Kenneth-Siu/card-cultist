import React from "react";
import SquareFrontPageCanvas from "./SquareFrontPageCanvas";
import PageView from "../PageView";

export default function SquareFrontPageView({ page, pageNumber }) {
    return (
        <PageView
            page={page}
            toolbarExtras={<input type="text" value={page.title} onChange={(event) => setTitle(event.target.value)} />}
            canvas={<SquareFrontPageCanvas page={page} pageNumber={pageNumber} />}
        />
    );

    function setTitle(title) {
        page.title = title;
        refreshCampaign();
    }
}
