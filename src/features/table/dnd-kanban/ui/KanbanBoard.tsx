import React, { type ReactNode } from "react";

// Компонент Kanban Board - отвечает за отображение всей доски
interface KanbanBoardProps {
  children: ReactNode;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ children }) => {
  return (
    <div className="flex gap-4 p-4 overflow-x-auto w-full min-h-[80vh]">
      {children}
    </div>
  );
};

export default KanbanBoard;
