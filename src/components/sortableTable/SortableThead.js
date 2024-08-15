import React from "react";
import "./SortableTable.scss";

export default function SortableThead({ children }) {
    return <div className="sortable-thead">{children}</div>;
}