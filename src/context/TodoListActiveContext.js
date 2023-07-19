import React, { createContext, useState } from "react"

export const TodoListActiveContext = createContext()

export const TodoListActiveProvider = ({ children }) => {
  const [todoListActive, setTodoListActive] = useState({
    _id: "34efebb4-ff54-4cc8-8196-5aeb69f6263e",
    name: "Ecole",
    color: "#fc76a1",
  })

  const TodoListActive = (_id, name, color) => {
    setTodoListActive({ _id, name, color })
  }

  return (
    <TodoListActiveContext.Provider value={{ todoListActive, TodoListActive }}>
      {children}
    </TodoListActiveContext.Provider>
  )
}
