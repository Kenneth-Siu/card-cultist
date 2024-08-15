import React from "react";
import "./SortableTable.scss";

export default function SortableTd({ children }) {
    return <div className="sortable-td">{children}</div>;
}