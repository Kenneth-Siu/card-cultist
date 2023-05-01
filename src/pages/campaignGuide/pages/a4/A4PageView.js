import React from "react";
import A4PageCanvas from "./A4PageCanvas";
import PageView from "../PageView";

export default function A4PageView({ page, pageNumber }) {
    return <PageView page={page} canvas={<A4PageCanvas page={page} pageNumber={pageNumber} />} />;
}
