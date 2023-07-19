import { useContext, useEffect, useReducer, useState } from "react"
import { db } from "../../../config/firebase-config"
import { collection, getDocs } from "firebase/firestore"
import styles from "./TodoLists.module.scss"
import TodoList from "./components/TodoList"
import AddTodo from "./components/AddTodo"
import todoReducer from "../../../reducers/todoReducer"
import Loader from "../../../components/Loader/Loarder"
import { ToggleSidebardContext } from "../../../context/ToggleSidebarContext"
import { TodoListActiveContext } from "../../../context/TodoListActiveContext"
import { useWindowWidth } from "../../../context/WindowContext.js"
import { AddModalTodoListContext } from "../../../context/AddModalTodoListContext"

function TodoLists({ setIsMenuOpen, isMenuOpen, handleClickDeleteTodoList }) {
  const [state, dispatch] = useReducer(todoReducer, { todoList: [] })
  const [loading, setLoading] = useState(true)
  const { sidebarActive, toggleSidebar } = useContext(ToggleSidebardContext)
  const { todoListActive } = useContext(TodoListActiveContext)
  const { openModal } = useContext(AddModalTodoListContext)

  const windowWidth = useWindowWidth()

  useEffect(() => {
    let ignore = false
    async function fetchTodoList() {
      const todos = []
      try {
        setLoading(true)
        const querySnapshot = await getDocs(
          collection(db, `Todos/${todoListActive.name}/List`)
        )
        querySnapshot.forEach((doc) => {
          const todo = {
            _id: doc.id,
            ...doc.data().todo,
          }
          todos.push(todo)
        })
        if (!ignore) {
          dispatch({ type: "FETCH_TODOS", todoList: todos })
        }
      } catch (e) {
        console.log("Erreur lors de la récupération des todos : ", e)
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }
    fetchTodoList()
    return () => {
      ignore = true
    }
  }, [todoListActive])

  function addTodo(newTodo) {
    dispatch({ type: "ADD_TODO", todo: newTodo })
  }

  function deleteTodo(deletedTodo) {
    dispatch({ type: "DELETE_TODO", todo: deletedTodo })
  }

  function updateTodo(updatedTodo) {
    dispatch({ type: "UPDATE_TODO", todo: updatedTodo })
  }

  return (
    <main
      className={`d-flex flex-fill justify-content-center  ${`${styles.nav} ${
        sidebarActive ? styles.sidebarActive : ""
      }`}`}
    >
      {windowWidth < 768 && (
        <div className={styles.addTodoList} onClick={openModal}>
          <i className="ri-add-fill"></i>
        </div>
      )}

      <div className={`d-flex flex-column flex-fill ${styles.container}`}>
        <div className={styles.headTitle}>
          <div>
            <button className="btn mr-15">
              <i className="ri-arrow-left-s-line "></i>
            </button>
            <button className="btn mr-15" onClick={() => toggleSidebar()}>
              <i className="ri-menu-line"></i>
            </button>
            <h1>{todoListActive.name}</h1>
          </div>
          <i
            className="ri-more-fill"
            onClick={(e) => {
              e.stopPropagation()
              setIsMenuOpen(!isMenuOpen)
            }}
          ></i>
        </div>
        <div
          className={`d-flex flex-column card ${styles.actionMenu}`}
          style={{
            maxHeight: isMenuOpen ? "80px" : "0px",
            opacity: isMenuOpen ? 1 : 0,
            overflow: "hidden",
            padding: isMenuOpen ? "10px" : "0px",
          }}
        >
          <button
            style={{
              background: todoListActive.color,
              border: `2px solid ${todoListActive.color}`,
            }}
            className="btn"
            onClick={handleClickDeleteTodoList}
          >
            Supprimer
          </button>
        </div>
        <AddTodo addTodo={addTodo} />
        {loading ? (
          <div className="d-flex flex-fill justify-content-center align-items-center">
            <Loader />
          </div>
        ) : (
          <TodoList
            todoList={state.todoList}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        )}
      </div>
    </main>
  )
}

export default TodoLists
