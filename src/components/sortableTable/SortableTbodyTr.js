import React from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import "./SortableTable.scss";

export default function SortableTbodyTr({ children, id }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return <div className="sortable-tr" ref={setNodeRef} style={style} {...attributes} {...listeners}>
        {children}
    </div>;
}