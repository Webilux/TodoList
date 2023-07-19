import { useContext, useEffect, useReducer, useState } from "react"
import Sidebar from "../../components/Sidebar/Sidebar"
import TodoLists from "./TodoLists/TodoLists"
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore"
import { TodoListActiveContext } from "../../context/TodoListActiveContext"
import { ToggleSidebardContext } from "../../context/ToggleSidebarContext"
import todoListReducer from "../../reducers/todoListReducer"
import { db } from "../../config/firebase-config"

function Main({ isMenuOpen, setIsMenuOpen }) {
  const [state, dispatch] = useReducer(todoListReducer, { todoLists: [] })
  const { toggleSidebar } = useContext(ToggleSidebardContext)
  const { todoListActive, TodoListActive } = useContext(TodoListActiveContext)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let ignore = false
    async function fetchTodoLists() {
      try {
        setLoading(true)
        const querySnapshot = await getDocs(
          query(collection(db, "Todos"), orderBy("createdAt", "asc"))
        )
        const fetchedTodoLists = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
        }))

        if (!ignore) {
          dispatch({
            type: "FETCH_TODO_LISTS",
            todoLists: fetchedTodoLists,
          })
        }
      } catch (e) {
        console.log("Erreur lors de la récupération des todos : ", e)
      } finally {
        if (!ignore) {
          setLoading(false)
          toggleSidebar()
        }
      }
    }

    fetchTodoLists()

    return () => {
      ignore = true
    }
  }, [])

  async function handleClickDeleteTodoList() {
    let todoList = `Todos/${todoListActive.name}`
    try {
      setLoading(true)
      await deleteDoc(doc(db, todoList))
      deleteTodoList(todoListActive)
      TodoListActive(
        state.todoLists[0]._id,
        state.todoLists[0].name,
        state.todoLists[0].color
      )
    } catch (e) {
      console.log("Erreur : ", e)
    } finally {
      setLoading(false)
    }
  }

  const handleTodoListActive = (_id, name, color) => {
    TodoListActive(_id, name, color)
  }

  function addTodoList(newTodoList) {
    dispatch({ type: "ADD_TODO_LIST", todoLists: newTodoList })
  }

  function deleteTodoList(deletedTodoList) {
    dispatch({ type: "DELETE_TODO_LIST", todoLists: deletedTodoList })
  }

  return (
    <div className="d-flex flex-row flex-fill">
      <Sidebar
        handleTodoListActive={handleTodoListActive}
        addTodoList={addTodoList}
        state={state}
      />
      <TodoLists
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        handleClickDeleteTodoList={handleClickDeleteTodoList}
      />
    </div>
  )
}

export default Main
