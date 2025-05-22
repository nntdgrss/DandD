// Тип для идентификаторов
export type Id = string;

// Тип для колонки канбан-доски
export interface Column {
  id: Id;
  title: string;
}

// Тип для задачи
export interface Task {
  id: Id;
  columnId: Id;
  content: string;
}
