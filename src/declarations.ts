export type ToDo = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export interface TContext {
  toDoList: Array<ToDo>;
  removeFromList: (idToDo: ToDo["id"]) => void;
  updateCheckList: (idToDo: ToDo["id"]) => void;
}
