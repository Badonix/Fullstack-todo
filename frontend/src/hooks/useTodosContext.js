import { TodosContext } from "../context/TodoContext";
import { useContext } from "react";

export const useTodosContext = () => {
  const context = useContext(TodosContext);

  if (!context) {
    throw Error(
      "useTodosContext must be used inside an WorkoutsContextProvider"
    );
  }

  return context;
};
