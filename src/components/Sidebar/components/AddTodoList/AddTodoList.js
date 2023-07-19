import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Select from "react-select"
import { useForm, Controller } from "react-hook-form"
import styles from "./AddTodoList.module.scss"
import { colourStyles, iconStyles } from "./components/StylesSelect"
import { colorOptions, iconOptions } from "./components/DataSelect"
import { useContext, useState } from "react"
import { AddModalTodoListContext } from "../../../../context/AddModalTodoListContext"
import { doc, setDoc } from "firebase/firestore"
import { db } from "../../../../config/firebase-config"
import { TodoListActiveContext } from "../../../../context/TodoListActiveContext"

const schema = yup.object({
  name: yup
    .string()
    .required("Le nom de la liste de tache doit être rensigné")
    .max(15, "Le nom de la liste de tache doit être succinct"),
  color: yup.object({
    value: yup
      .string()
      .required("La couleur de la liste de tâches doit être sélectionné"),
  }),
  icon: yup.object({
    value: yup
      .string()
      .required("L'icon de la liste de tâches doit être sélectionné"),
  }),
})

function AddTodoList({ addTodoList }) {
  const { closeModal } = useContext(AddModalTodoListContext)
  const { TodoListActive } = useContext(TodoListActiveContext)
  const [loading, setLoading] = useState(false)

  const {
    control,
    setError,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  })

  async function submitHandler(values) {
    let todoList = {
      _id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      name: values.name,
      color: values.color.value,
      icon: values.icon.value,
    }
    try {
      setLoading(true)
      await setDoc(doc(db, "Todos", values.name), {
        ...todoList,
      })
      addTodoList({ ...todoList })
      closeModal()
      TodoListActive(todoList._id, todoList.name, todoList.color)
    } catch (e) {
      setError("generic", {
        message:
          e.message ||
          "Une erreur s'est produite lors de la création de la liste de tâches. Merci de réessayer plus tard",
      })
    } finally {
      setLoading(true)
    }
  }

  return (
    <div
      className={`d-flex justify-content-center align-items-center calc ${styles.modale} `}
      onClick={closeModal}
    >
      <div
        className={`d-flex  align-items-center card flex-column mx-10 ${styles.content}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="py-10">Ajouter un nouvelle liste de tache</h3>
        <form onSubmit={handleSubmit(submitHandler)} className="p-20 px-15">
          <div className="d-flex flex-column mb-20">
            <label className="mb-5 ml-5">Nom</label>
            <input
              {...register("name")}
              type="text"
              placeholder="Choisir un nom..."
            />
            {errors.name && (
              <span className="p-5" style={{ color: "rgb(231, 76, 60)" }}>
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="d-flex flex-column mb-20">
            <label className="mb-5 ml-5">Couleurs</label>
            <Controller
              name={"color"}
              control={control}
              render={({ field }) => {
                return (
                  <Select
                    {...field}
                    options={colorOptions}
                    placeholder="Choisir une couleur..."
                    styles={colourStyles}
                  />
                )
              }}
            />
            {errors.color && (
              <span className="p-5" style={{ color: "rgb(231, 76, 60)" }}>
                {errors.color.value.message}
              </span>
            )}
          </div>
          <div className="d-flex flex-column mb-20">
            <label className="mb-5 ml-5">Icons</label>
            <Controller
              name={"icon"}
              control={control}
              render={({ field }) => {
                return (
                  <Select
                    {...field}
                    options={iconOptions}
                    styles={iconStyles}
                    placeholder="Choisir un icon"
                  />
                )
              }}
            />
            {errors.icon && (
              <span className="p-5" style={{ color: "rgb(231, 76, 60)" }}>
                {errors.icon.value.message}
              </span>
            )}
          </div>
          {errors.generic && (
            <p className="p-5" style={{ color: "rgb(231, 76, 60)" }}>
              {errors.generic.message}
            </p>
          )}
          <div>
            <button className="btn mr-10" type="button" onClick={closeModal}>
              Annuler
            </button>
            <button disabled={isSubmitting} className="btn" type="submit">
              {loading ? (
                <i className="ri-loop-right-fill py-10 px-20"></i>
              ) : (
                "Ajouter"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddTodoList
