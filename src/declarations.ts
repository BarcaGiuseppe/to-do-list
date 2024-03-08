export type ToDo = {
  userId: number;
  id: number;
  title: string;
  body: string;
  check: boolean;
};

export interface TContext {
  toDoList: Array<ToDo>;
  removeFromList: (idToDo: ToDo["id"]) => void;
  changeCheckToDo: (idToDo: ToDo["id"]) => void;
}
