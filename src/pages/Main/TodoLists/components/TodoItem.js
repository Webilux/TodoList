import { useContext, useEffect, useState } from "react"
import { doc, deleteDoc } from "firebase/firestore"
import { db } from "../../../../config/firebase-config"
import { TodoListActiveContext } from "../../../../context/TodoListActiveContext"
import { useUpdateData } from "../../../../hooks/useUpdateData"
import styles from "./TodoItem.module.scss"
import { useWindowWidth } from "../../../../context/WindowContext.js"

function TodoItem({ todo, deleteTodo, updateTodo }) {
  const { todoListActive } = useContext(TodoListActiveContext)
  const { isLoading, tryUpdateTodo } = useUpdateData(todo, updateTodo)
  const [loading, setLoading] = useState(false)
  const [actionMobile, setActionMobile] = useState(false)

  const windowWidth = useWindowWidth()

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading])

  async function handleClickDeleteTodo() {
    try {
      setLoading(true)
      await deleteDoc(doc(db, `Todos/${todoListActive.name}/List/${todo._id}`))
      deleteTodo(todo)
    } catch (e) {
      console.log("Erreur : ", e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <li
      className={`${styles.todoItem} mb-10 d-flex flex-column justify-content-center align-items-center`}
    >
      <div
        className={`${styles.todoItemContainer} d-flex flex-row justify-content-center align-items-center`}
      >
        {!todo.done ? (
          <button
            style={{ "--todo-list-color": todoListActive.color }}
            className={`${styles.btn} ${styles.btnNotDone} mr-5`}
            onClick={(e) => {
              e.stopPropagation()
              tryUpdateTodo({ ...todo, done: !todo.done })
            }}
          >
            <i
              className="ri-check-line"
              style={{ "--todo-list-color": todoListActive.color }}
            ></i>
          </button>
        ) : (
          <button
            className={`${styles.btnDone} ${styles.btn} mr-5`}
            style={{ "--todo-list-color": todoListActive.color }}
            onClick={(e) => {
              e.stopPropagation()
              tryUpdateTodo({ ...todo, done: !todo.done })
            }}
          >
            <i
              className="ri-check-line"
              style={{ "--todo-list-color": todoListActive.color }}
            ></i>
          </button>
        )}
        {loading ? (
          <span className="flex-fill p-10">Modification de la liste...</span>
        ) : (
          <span className="flex-fill p-10">
            {todo.done ? <s>{todo.content}</s> : todo.content}
          </span>
        )}
        {windowWidth < 768 ? (
          <i
            className="ri-more-fill"
            style={{ fontSize: "20px" }}
            onClick={(e) => {
              e.stopPropagation()
              setActionMobile(!actionMobile)
            }}
          ></i>
        ) : (
          <div className="d-flex flex-row align-items-center my-5">
            <button
              className="btn mr-15"
              style={{
                background: todoListActive.color,
                border: `1px solid ${todoListActive.color}`,
              }}
              onClick={(e) => {
                e.stopPropagation()
                tryUpdateTodo({ ...todo, edit: true })
              }}
            >
              Modifier
            </button>
            <button
              className="btn"
              style={{
                background: "transparent",
                border: `2px solid ${todoListActive.color}`,
                color: todoListActive.color,
              }}
              onClick={(e) => {
                e.stopPropagation()
                handleClickDeleteTodo()
              }}
            >
              Supprimer
            </button>
          </div>
        )}
      </div>
      <div
        style={{
          opacity: actionMobile ? 1 : 0,
          transform: actionMobile ? "translateY(0)" : "translateY(-100%)",
          display: actionMobile ? "flex" : "none",
        }}
        className={styles.actionMobileContainer}
      >
        <button
          className="btn mr-15"
          style={{
            background: todoListActive.color,
            border: `1px solid ${todoListActive.color}`,
          }}
          onClick={(e) => {
            e.stopPropagation()
            tryUpdateTodo({ ...todo, edit: true })
          }}
        >
          Modifier
        </button>
        <button
          className="btn"
          style={{
            background: "transparent",
            border: `2px solid ${todoListActive.color}`,
            color: todoListActive.color,
          }}
          onClick={(e) => {
            e.stopPropagation()
            handleClickDeleteTodo()
          }}
        >
          Supprimer
        </button>
      </div>
    </li>
  )
}

export default TodoItem
