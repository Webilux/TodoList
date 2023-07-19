import styles from "./Sidebar.module.scss"
import { useContext } from "react"
import { ToggleSidebardContext } from "../../context/ToggleSidebarContext"
import { TodoListActiveContext } from "../../context/TodoListActiveContext"
import AddTodoList from "./components/AddTodoList/AddTodoList"
import { AddModalTodoListContext } from "../../context/AddModalTodoListContext"
import { useWindowWidth } from "../../context/WindowContext.js"

function Sidebar({ handleTodoListActive, addTodoList, state }) {
  const { sidebarActive, toggleSidebar } = useContext(ToggleSidebardContext)
  const { todoListActive } = useContext(TodoListActiveContext)
  const { isModalOpen } = useContext(AddModalTodoListContext)
  const windowWidth = useWindowWidth()

  return (
    <>
      {isModalOpen && <AddTodoList addTodoList={addTodoList} />}
      <nav
        className={`${styles.nav} ${sidebarActive ? styles.sidebarActive : ""}`}
      >
        <div className="d-flex align-items-center pb-20">
          <h3>Collections</h3>
          <i onClick={toggleSidebar} className="ri-close-fill"></i>
        </div>
        <ul>
          {state.todoLists.map((todoList, i) => (
            <li
              key={todoList._id}
              onClick={() => {
                handleTodoListActive(
                  todoList._id,
                  todoList.name,
                  todoList.color
                )
                if (windowWidth < 768) {
                  toggleSidebar()
                }
              }}
              className={
                todoList._id === todoListActive._id ? styles.active : ""
              }
            >
              <span className="mr-10">
                <i
                  className={`${state.todoLists[i].icon} btn`}
                  style={{ background: state.todoLists[i].color }}
                ></i>
              </span>
              <span>{todoList.name}</span>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}

export default Sidebar
