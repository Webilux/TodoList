import { useContext, useState } from "react"
import { useUpdateData } from "../../../../hooks"
import { TodoListActiveContext } from "../../../../context/TodoListActiveContext"
import styles from "./EditTodo.module.scss"
import { useWindowWidth } from "../../../../context/WindowContext.js"

function EditTodo({ todo, updateTodo }) {
  const { isLoading, tryUpdateTodo } = useUpdateData(todo, updateTodo)
  const [value, setValue] = useState(todo.content)
  const { todoListActive } = useContext(TodoListActiveContext)
  const windowWidth = useWindowWidth()

  function handleChange(e) {
    const inputValue = e.target.value
    setValue(inputValue)
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && value.length) {
      tryUpdateTodo({ ...todo, content: value, edit: false })
    }
  }

  function handleClick() {
    if (value.length) {
      tryUpdateTodo({ ...todo, content: value, edit: false })
    }
  }

  return (
    <div
      className={`d-flex justify-content-center align-items-center mb-10  ${styles.todoItem}`}
    >
      <div
        className={`d-flex flex-fill justify-content-center align-items-center ${styles.todoItemContainer}`}
      >
        {isLoading ? (
          <span className="mr-15 flex-fill p-10">
            Chargement des modifications...
          </span>
        ) : (
          <input
            type="text"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            value={value}
            className="mr-15 flex-fill"
            placeholder="Ajouter une tâche"
          />
        )}
        {windowWidth > 768 && (
          <div
            className={`d-flex flex-row align-items-center my-5 ${styles.actionMobileContainer}`}
          >
            <button
              onClick={handleClick}
              className="btn mr-15"
              style={{
                background: todoListActive.color,
                border: `1px solid ${todoListActive.color}`,
              }}
            >
              Sauvegarder
            </button>
            <button
              onClick={() => tryUpdateTodo({ ...todo, edit: false })}
              className="btn "
              style={{
                background: "transparent",
                border: `2px solid ${todoListActive.color}`,
                color: todoListActive.color,
              }}
            >
              Annuler
            </button>
          </div>
        )}
      </div>
      {windowWidth < 768 && (
        <div
          className={`d-flex flex-row align-items-center my-5 ${styles.actionMobileContainer}`}
        >
          <button
            onClick={handleClick}
            className="btn mr-15"
            style={{
              background: todoListActive.color,
              border: `1px solid ${todoListActive.color}`,
            }}
          >
            Sauvegarder
          </button>
          <button
            onClick={() => tryUpdateTodo({ ...todo, edit: false })}
            className="btn "
            style={{
              background: "transparent",
              border: `2px solid ${todoListActive.color}`,
              color: todoListActive.color,
            }}
          >
            Annuler
          </button>
        </div>
      )}
    </div>
  )
}

export default EditTodo
