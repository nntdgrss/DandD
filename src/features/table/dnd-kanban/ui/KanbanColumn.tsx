import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Column, Task } from "../types/types";
import { KanbanItem } from "./KanbanItem";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

// Пропсы для компонента колонки канбан-доски
interface KanbanColumnProps {
  column: Column;
  tasks: Task[];
  isOverlay?: boolean;
}

// Компонент колонки канбан-доски
const KanbanColumn: React.FC<KanbanColumnProps> = ({
  column,
  tasks,
  isOverlay,
}) => {
  // Используем хук useSortable для возможности перетаскивания колонки
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "column",
      column,
    },
  });

  // Стили для колонки при перетаскивании
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  // Получаем массив ID задач для контекста сортировки
  const tasksIds = tasks.map((task) => task.id);

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        width: "280px",
        minHeight: "500px",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f4f5f7",
        borderRadius: "8px",
        border: isOverlay ? "2px dashed #4dabf7" : "1px solid #ddd",
        boxShadow: isOverlay
          ? "0 0 15px rgba(0, 0, 0, 0.2)"
          : "0 2px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Заголовок колонки, который можно перетаскивать */}
      <div
        {...attributes}
        {...listeners}
        className="column-header"
        style={{
          padding: "10px",
          fontWeight: "bold",
          borderBottom: "1px solid #ddd",
          backgroundColor: "#e9ecef",
          borderRadius: "8px 8px 0 0",
          cursor: "grab",
          userSelect: "none",
        }}
      >
        {column.title}
      </div>

      {/* Контейнер для задач с вертикальной сортировкой */}
      <div
        className="column-tasks"
        style={{
          padding: "10px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          overflowY: "auto",
        }}
      >
        <SortableContext
          items={tasksIds}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <KanbanItem key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

export default KanbanColumn;
