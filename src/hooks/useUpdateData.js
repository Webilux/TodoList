import { useContext, useState } from "react"
import { db } from "../config/firebase-config"
import { doc, updateDoc } from "firebase/firestore"
import { TodoListActiveContext } from "../context/TodoListActiveContext"

export function useUpdateData(todo, updateTodo) {
  const [isLoading, setIsLoading] = useState(false)
  const { todoListActive } = useContext(TodoListActiveContext)

  async function tryUpdateTodo({ content, edit, done }) {
    try {
      setIsLoading(true)
      await updateDoc(
        doc(db, `Todos/${todoListActive.name}/List/${todo._id}`),
        {
          todo: {
            ...todo,
            content: content,
            done: done,
            edit: edit,
          },
        }
      )
      updateTodo({
        ...todo,
        content: content,
        done: done,
        edit: edit,
      })
    } catch (e) {
      console.log("Modification échouée : ", e)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    tryUpdateTodo,
  }
}
