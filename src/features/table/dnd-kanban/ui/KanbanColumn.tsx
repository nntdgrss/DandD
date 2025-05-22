import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Column, Task } from "../types/types";
import { KanbanItem } from "./KanbanItem";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { cn } from "@/lib/utils";

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
      className={cn(
        "w-[280px] min-h-[500px] flex flex-col dark:bg-zinc-900 text-white rounded-md border-2",
        isOverlay && "border-blue-500 border-dashed"
      )}
      style={{
        ...style,
        boxShadow: isOverlay
          ? "0 0 15px rgba(0, 0, 0, 0.2)"
          : "0 2px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Заголовок колонки, который можно перетаскивать */}
      <div
        {...attributes}
        {...listeners}
        className="p-[10px] font-bold border-b-2 dark:border-b-zinc-700 border-b-zinc-200 border-zinc-700 select-none cursor-grab dark:text-white text-black"
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
