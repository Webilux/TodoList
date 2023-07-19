import React, { useContext, useRef, useState } from "react"
import { addDoc, collection } from "firebase/firestore"
import { db } from "../../../../config/firebase-config"
import styles from "./AddTodo.module.scss"
import { TodoListActiveContext } from "../../../../context/TodoListActiveContext"

function AddTodo({ addTodo }) {
  const { todoListActive } = useContext(TodoListActiveContext)
  const [value, setValue] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const errorMessage = useRef(null)
  const inputRef = useRef(null)

  function handleChange(e) {
    const inputValue = e.target.value
    setValue(inputValue)
  }

  let todo = {
    content: value,
    edit: false,
    done: false,
  }

  async function createTodo() {
    errorMessage.current.style.display = "none"
    inputRef.current.classList.remove("input-error")
    try {
      setLoading(true)
      setError(null)
      const docRef = await addDoc(
        collection(db, `Todos/${todoListActive.name}/List`),
        {
          todo,
        }
      )
      addTodo({ ...todo, _id: docRef.id })
    } catch (e) {
      setError("Erreur lors de l'ajout du document : ", e)
    } finally {
      setLoading(false)
    }
    setValue("")
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      if (value.length) {
        createTodo()
      } else {
        handleError()
      }
    }
  }

  function handleClick() {
    if (value.length) {
      createTodo()
    } else {
      handleError()
    }
  }

  function handleError() {
    errorMessage.current.style.display = "block"
    inputRef.current.classList.add("input-error")
    inputRef.current.focus()
  }

  return (
    <div className={styles.container}>
      <div className="d-flex justify-content-center align-items-center">
        <button
          onClick={handleClick}
          className="btn"
          style={{
            background: todoListActive.color,
            border: `1px solid ${todoListActive.color}`,
          }}
        >
          {loading ? (
            <i className="ri-loop-right-fill"></i>
          ) : (
            <i className="ri-add-fill"></i>
          )}
        </button>
        <input
          type="text"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={value}
          ref={inputRef}
          className="mr-15 flex-fill"
          placeholder="Ajouter une tâche"
          disabled={loading}
        />
      </div>
      <p ref={errorMessage} style={{ display: "none", color: "#e74c3c" }}>
        vous devez renseigner une tâche
      </p>
      {error && <p>{error}</p>}
    </div>
  )
}

export default AddTodo
