import React from "react";
import SquarePageCanvas from "./SquarePageCanvas";
import PageView from "../PageView";

export default function SquarePageView({ page, pageNumber }) {
    return <PageView page={page} canvas={<SquarePageCanvas page={page} pageNumber={pageNumber} />} />;
}
