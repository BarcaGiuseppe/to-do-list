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
  changeCheckToDo: () => {},
});

interface Props {
  children: ReactNode;
}

export const useDataByContext = () => useContext(AppContext);

export function ContextProvider({ children }: Props) {
  const [toDoList, setToDoList] = useState<TContext["toDoList"]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  console.log(toDoList);

  const removeFromList = (idToDo: ToDo["id"]) => {
    const newList = toDoList.filter((toDo) => toDo.id !== idToDo);
    setToDoList(newList);
  };

  const addCheckToItem = (data: any) => {
    const newData = data.map((elem: any) => {
      return {
        userId: elem.userId,
        id: elem.id,
        title: elem.title,
        body: elem.body,
        check: false,
      };
    });
    return newData;
  };

  const changeCheckToDo = (idToDo: ToDo["id"]) => {
    const newToDoList = toDoList.map((elem) => {
      if (elem.id === idToDo) return { ...elem, check: !elem.check };
      return elem;
    });
    setToDoList(newToDoList);
  };

  const getToDoList = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      const newData = addCheckToItem(data);
      setToDoList(newData);
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
        changeCheckToDo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export async function getServerSideProps() {
  //const products = await fetchData();
  //   const res = await fetch(process.env.VERCEL_URL + "/api/products");
  //   const list2 = await res.json();

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const list = await response.json();
    return {
      props: {
        list,
      },
    };
  } catch (error: any) {
    throw error;
  }
}
