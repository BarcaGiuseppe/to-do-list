import { useDataByContext } from "@/ContextProvider";
import { ToDo } from "@/declarations";
import { Inter } from "next/font/google";
import React from "react";
import styled from "styled-components";

const inter = Inter({ subsets: ["latin"] });

const HomePageWrapper = styled.div(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const ToDoContainer = styled.div(() => ({
  display: "flex",
  flexWrap: "wrap",
  flexDirection: "column",
  alignItems: "center",
  width: "80%",
  marginTop: "20px",
}));

const ToDoItem = styled.div(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "10px",
  width: "80%",
  marginBottom: "10px",
}));

const ToDoInfo = styled.div(() => ({
  display: "flex",
  alignItems: "center",
}));

const ToDoCheck = styled.input(() => ({
  width: "30%",
}));

const ToDoTitle = styled.h3(() => ({
  margin: "0",
}));

const ToDoBody = styled.p(() => ({
  margin: "0",
}));

const RemoveButton = styled.button(() => ({
  backgroundColor: "red",
  color: "white",
  border: "none",
  borderRadius: "4px",
  padding: "5px 10px",
  cursor: "pointer",
}));

export default function Home() {
  const { toDoList, removeFromList, updateCheckList } = useDataByContext();

  //console.log(toDoList);

  const handleClickButton = (id: ToDo["id"]) => {
    removeFromList(id);
  };

  const handleChangeCheckStatus = (id: ToDo["id"]) => {
    updateCheckList(id);
  };

  return (
    <HomePageWrapper>
      <h1>To Do List</h1>
      <ToDoContainer>
        {toDoList.map((toDo: any, index: any) => {
          return (
            <ToDoItem key={index}>
              <ToDoInfo>
                <ToDoCheck
                  type="checkbox"
                  value={toDo.check}
                  onChange={() => handleChangeCheckStatus(toDo.id)}
                ></ToDoCheck>
                <div>
                  <ToDoTitle>{toDo.title}</ToDoTitle>
                  <ToDoBody>{toDo.body}</ToDoBody>
                </div>
                <RemoveButton onClick={() => handleClickButton(toDo.id)}>
                  Remove
                </RemoveButton>
              </ToDoInfo>
            </ToDoItem>
          );
        })}
      </ToDoContainer>
    </HomePageWrapper>
  );
}
