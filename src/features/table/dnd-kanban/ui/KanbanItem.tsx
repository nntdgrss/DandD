import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Task } from "../types/types";
import { cn } from "@/lib/utils";

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
      className={cn(
        "p-2.5 rounded-sm shadow-sm cursor-grab user-select-none dark:bg-zinc-800 dark:text-white text-black bg-zinc-100",
        isOverlay && "dark:bg-zinc-700  border-blue-500 border-2 border-dashed"
      )}
      style={{
        ...style,
        boxShadow: isOverlay
          ? "0 0 10px rgba(59, 130, 246, 0.3)"
          : "0 1px 3px rgba(0, 0, 0, 0.3)",
      }}
    >
      {task.content}
    </div>
  );
};

export { KanbanItem };
