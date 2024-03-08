import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { ToDo, TContext } from "./declarations";

export const AppContext = createContext<TContext>({
  toDoList: [],
  removeFromList: () => {},
  updateCheckList: () => {},
});

interface Props {
  children: ReactNode;
}

export const useDataByContext = () => useContext(AppContext);

export function ContextProvider({ children }: Props) {
  const [toDoList, setToDoList] = useState<TContext["toDoList"]>([]);
  const [checkList, setCheckList] = useState<Array<ToDo["id"]>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  //   console.log(toDoList);
  //   console.log(checkList);

  const removeFromList = (idToDo: ToDo["id"]) => {
    const newList = toDoList.filter((toDo) => toDo.id !== idToDo);
    setToDoList(newList);
  };

  const updateCheckList = (idToDo: ToDo["id"]) => {
    const findId = checkList.find((elem) => elem === idToDo);
    if (!!findId) {
      const newCheckList = checkList.filter((elem) => elem !== idToDo);
      setCheckList(newCheckList);
    } else {
      const newCheckList = [...checkList, idToDo];
      setCheckList(newCheckList);
    }
  };

  const getToDoList = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      setToDoList(data);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getToDoList();
  }, []);

  return (
    <AppContext.Provider
      value={{
        toDoList,
        removeFromList,
        updateCheckList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
