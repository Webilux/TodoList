import TodoItem from "./TodoItem"
import EditTodo from "./EditTodo"

export default function TodoList({ todoList, deleteTodo, updateTodo }) {
  const doneTasks = []
  const notDoneTasks = []

  todoList.forEach((todo) => {
    const taskElement = todo.edit ? (
      <EditTodo key={todo._id} todo={todo} updateTodo={updateTodo} />
    ) : (
      <TodoItem
        key={todo._id}
        todo={todo}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
      />
    )
    if (todo.done) {
      doneTasks.push(taskElement)
    } else {
      notDoneTasks.push(taskElement)
    }
  })

  return todoList.length ? (
    <div>
      {notDoneTasks.length > 0 && (
        <div>
          <h3>Tâches - {notDoneTasks.length}</h3>
          <ul>{notDoneTasks}</ul>
        </div>
      )}
      {doneTasks.length > 0 && (
        <div>
          <h3 className="mt-30">Terminées - {doneTasks.length}</h3>
          <ul>{doneTasks}</ul>
        </div>
      )}
    </div>
  ) : (
    <p>Aucune tâche en cours</p>
  )
}
