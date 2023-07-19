import { useContext } from "react"
import styles from "./Loader.module.scss"
import { TodoListActiveContext } from "../../context/TodoListActiveContext"

function Loader() {
  const { todoListActive } = useContext(TodoListActiveContext)

  return (
    <span
      className={styles.loader}
      style={{ "--todo-list-color": todoListActive.color }}
    ></span>
  )
}

export default Loader
