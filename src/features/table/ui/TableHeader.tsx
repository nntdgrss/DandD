import { ChevronLeft } from "lucide-react";
import type { Column } from "../dnd-kanban/types/types";
import type { Task } from "../dnd-kanban/types/types";
import { useNavigate } from "react-router";

interface ITableHeaderProps {
  tableState: string;
  setTableState: (value: string) => void;
  tasks: Task[];
  columns: Column[];
}

export default function TableHeader({
  tableState,
  setTableState,
  tasks,
  columns,
}: ITableHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="fixed top-5 left-5 flex flex-row items-center gap-4">
      <ChevronLeft
        className="cursor-pointer"
        size={28}
        onClick={() => navigate("/")}
      />
      <div className="flex flex-col items-start gap-1">
        <input
          type="text"
          value={tableState}
          onChange={(e) => setTableState(e.target.value)}
          className="text-xl font-bold outline-none"
          maxLength={50}
        />
        <p className="text-sm text-gray-500 select-none">
          {tasks.length} задач в {columns.length} колонках
        </p>
      </div>
    </div>
  );
}
