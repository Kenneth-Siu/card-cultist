import React from "react";
import "./SortableTable.scss";

export default function SortableTheadTr({ children }) {
    return <div className="sortable-tr">{children}</div>;
}