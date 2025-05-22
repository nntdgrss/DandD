import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Task } from "../types/types";

// Пропсы для компонента задачи
interface KanbanItemProps {
  task: Task;
  isOverlay?: boolean;
}

// Компонент для отдельной задачи
const KanbanItem: React.FC<KanbanItemProps> = ({ task, isOverlay }) => {
  // Используем хук useSortable для возможности перетаскивания задачи
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "task",
      task,
    },
  });

  // Стили для задачи при перетаскивании
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        ...style,
        padding: "10px",
        backgroundColor: isOverlay ? "#e7f5ff" : "white",
        border: isOverlay ? "2px dashed #4dabf7" : "1px solid #ddd",
        borderRadius: "4px",
        boxShadow: isOverlay
          ? "0 0 10px rgba(0, 0, 0, 0.15)"
          : "0 1px 3px rgba(0, 0, 0, 0.1)",
        cursor: "grab",
        userSelect: "none",
      }}
    >
      {task.content}
    </div>
  );
};

export { KanbanItem };
