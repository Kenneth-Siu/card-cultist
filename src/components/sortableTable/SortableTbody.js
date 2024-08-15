import React from "react";
import { DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import "./SortableTable.scss";

export default function SortableTbody({ children, items, setItems }) {
    const sensors = useSensors(useSensor(PointerSensor));

    return <div className="sortable-tbody">
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <SortableContext items={items} strategy={verticalListSortingStrategy}>{children}
            </SortableContext>
        </DndContext>
    </div>;

    function handleDragEnd(event) {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = items.findIndex((item) => item.id === active.id);
            const newIndex = items.findIndex((item) => item.id === over.id);
            setItems(arrayMove(items, oldIndex, newIndex));
        }
    }
}