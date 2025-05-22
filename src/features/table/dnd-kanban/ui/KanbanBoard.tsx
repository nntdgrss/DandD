import React, { type ReactNode } from "react";

// Компонент Kanban Board - отвечает за отображение всей доски
interface KanbanBoardProps {
  children: ReactNode;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ children }) => {
  return (
    <div
      className="kanban-board"
      style={{
        display: "flex",
        gap: "1rem",
        padding: "1rem",
        overflowX: "auto",
        width: "100%",
        minHeight: "80vh",
      }}
    >
      {children}
    </div>
  );
};

export default KanbanBoard;
