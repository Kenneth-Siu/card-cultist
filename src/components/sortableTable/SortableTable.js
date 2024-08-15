import React from "react";
import "./SortableTable.scss";

export default function SortableTable({ children }) {
    return <div className="sortable-table">{children}</div>;
}