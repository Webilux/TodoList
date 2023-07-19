import React, { createContext, useState } from "react"

export const AddModalTodoListContext = createContext()

export const AddModalTodoListProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <AddModalTodoListContext.Provider
      value={{ isModalOpen, openModal, closeModal }}
    >
      {children}
    </AddModalTodoListContext.Provider>
  )
}
