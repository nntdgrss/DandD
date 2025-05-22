import { useParams } from "react-router";
import { useState, useEffect } from "react";
import type {
  Column,
  Id,
  Task,
} from "../features/table/dnd-kanban/types/types";
import {
  closestCorners,
  DndContext,
  DragOverlay,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { PointerSensor, useSensor } from "@dnd-kit/core";
import { KeyboardSensor } from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import KanbanBoard from "@/features/table/dnd-kanban/ui/KanbanBoard";
import KanbanColumn from "@/features/table/dnd-kanban/ui/KanbanColumn";
import { KanbanItem } from "@/features/table/dnd-kanban/ui/KanbanItem";
import TableHeader from "@/features/table/ui/TableHeader";
// Начальные данные для колонок
const initialColumns: Column[] = [
  {
    id: "column-1",
    title: "Задачи",
  },
  {
    id: "column-2",
    title: "В работе",
  },
  {
    id: "column-3",
    title: "Завершены",
  },
];

// Начальные данные для задач
const initialTasks: Task[] = [
  {
    id: "task-1",
    columnId: "column-1",
    content: "Задача 1",
  },
  {
    id: "task-2",
    columnId: "column-1",
    content: "Задача 2",
  },
  {
    id: "task-3",
    columnId: "column-2",
    content: "Задача 3",
  },
  {
    id: "task-4",
    columnId: "column-2",
    content: "Задача 4",
  },
  {
    id: "task-5",
    columnId: "column-3",
    content: "Задача 5",
  },
];

export default function TablePage() {
  // Состояние для колонок и задач
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [tableState, setTableState] = useState("");
  const [table, setTable] = useState<string | undefined>(undefined);

  // Состояние для активного перетаскиваемого элемента
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  // Настройка сенсоров для перетаскивания
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const params = useParams();

  // Получение ID всех колонок для SortableContext
  const columnsId = columns.map((col) => col.id);

  // Обновляем состояние table при изменении params.table
  useEffect(() => {
    setTable(params.table);
    setTableState(params.table || "");
  }, [params.table]);

  // Обработчик начала перетаскивания
  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const activeId = active.id as Id;

    // Проверяем, что тянем - колонку или задачу
    if (activeId.toString().includes("column")) {
      const activeCol = columns.find((col) => col.id === activeId);
      if (activeCol) setActiveColumn(activeCol);
    } else {
      const activeTask = tasks.find((task) => task.id === activeId);
      if (activeTask) setActiveTask(activeTask);
    }

    console.log(`Начало перетаскивания элемента с ID: ${activeId}`);
  }

  // Обработчик перетаскивания над другими элементами
  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id as Id;
    const overId = over.id as Id;

    // Пропускаем, если перетаскиваем над тем же элементом
    if (activeId === overId) return;

    // Проверяем, перетаскиваем ли задачу
    const isActiveTask = activeId.toString().includes("task");
    const isOverTask = overId.toString().includes("task");

    // Если перетаскиваем задачу над другой задачей
    if (isActiveTask && isOverTask) {
      setTasks((tasks) => {
        // Находим индексы задач
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        // Если задачи из разных колонок, меняем колонку активной задачи
        if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
          // Создаем новый массив задач с измененной активной задачей
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        // Просто меняем позиции в одной колонке
        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    // Если перетаскиваем задачу над колонкой
    const isOverColumn = overId.toString().includes("column");

    if (isActiveTask && isOverColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);

        // Если задача уже в этой колонке, ничего не делаем
        if (tasks[activeIndex].columnId === overId) {
          return tasks;
        }

        // Меняем колонку задачи
        tasks[activeIndex].columnId = overId;
        console.log(`Задача ${activeId} перемещена в колонку ${overId}`);

        // Создаем новый массив задач чтобы вызвать ререндер
        return [...tasks];
      });
    }
  }

  // Обработчик завершения перетаскивания
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) {
      setActiveColumn(null);
      setActiveTask(null);
      return;
    }

    const activeId = active.id as Id;
    const overId = over.id as Id;

    // Если перетаскиваем колонки
    if (
      activeId.toString().includes("column") &&
      overId.toString().includes("column")
    ) {
      setColumns((columns) => {
        const activeIndex = columns.findIndex((col) => col.id === activeId);
        const overIndex = columns.findIndex((col) => col.id === overId);

        // Если позиции различаются, делаем перестановку
        if (activeIndex !== overIndex) {
          console.log(
            `Колонка ${activeId} перемещена на место колонки ${overId}`
          );
          return arrayMove(columns, activeIndex, overIndex);
        }

        return columns;
      });
    }

    // Сбрасываем состояния активных элементов
    setActiveColumn(null);
    setActiveTask(null);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <TableHeader
        tableState={tableState}
        setTableState={setTableState}
        tasks={tasks}
        columns={columns}
      />
      <div className="app-container">
        {/* DndContext оборачивает всю область, где будет работать D&D */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          {/* SortableContext для горизонтальной сортировки колонок */}
          <SortableContext
            items={columnsId}
            strategy={horizontalListSortingStrategy}
          >
            <KanbanBoard>
              {columns.map((column) => (
                <KanbanColumn
                  key={column.id}
                  column={column}
                  tasks={tasks.filter((task) => task.columnId === column.id)}
                />
              ))}
            </KanbanBoard>
          </SortableContext>

          {/* Оверлей для отображения перетаскиваемого элемента */}
          <DragOverlay>
            {activeColumn && (
              <KanbanColumn
                column={activeColumn}
                tasks={tasks.filter(
                  (task) => task.columnId === activeColumn.id
                )}
                isOverlay
              />
            )}
            {activeTask && <KanbanItem task={activeTask} isOverlay />}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}
